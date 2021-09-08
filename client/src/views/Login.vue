<template>
  <div class="login">
    <v-container>
      <div class="owl owll">
        <div class="hand owll"></div>
        <div class="hand hand-r owll"></div>
        <div class="arms owll">
          <div class="arm owll"></div>
          <div class="arm arm-r owll"></div>
        </div>
      </div>
      <v-row>
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5 pt-0">
          <v-text-field
            color="white"
            type="email"
            dark
            label="E-posta"
            append-outer-icon="mdi-account"
            v-model="email"
          ></v-text-field>
          <v-text-field
            type="password"
            color="white"
            dark
            label="Parola"
            append-outer-icon="mdi-key-variant"
            v-model="password"
            @focus="closeYourEyes"
            @blur="openYourEyes"
          ></v-text-field>
          <v-row>
              <v-col class="pl-6 row justify-space-between">
                <v-btn color="blue-grey" class="white--text" @click="login" tile>
                  GİRİŞ
                  <v-icon right dark>
                    mdi-login
                  </v-icon>
                </v-btn>
                <v-btn
                    color="blue-grey"
                    style="text-decoration: none;"
                    class="white--text"
                    href="/register"
                    tile
                >
                  KAYDOL
                  <v-icon right dark>
                    mdi-login
                  </v-icon>
                </v-btn>
              </v-col>
          </v-row>
          <GoogleLogin :params="params" :onSuccess="onSuccess" style="width: 98% !important;">
            <v-btn color="red darken-1" class="white--text" tile style="max-width: 100%;width:100% !important;">
              Google İle
              <v-icon right dark>
                mdi-google
              </v-icon>
            </v-btn>
          </GoogleLogin>
          <v-col class="pa-0 pt-4">
            <v-btn x-small tile link href="/passwdreset">Şifremi unuttum</v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay
      :opacity="1"
      :value="overlay"
      :color="
        $store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
      "
    >
      <v-progress-circular
        indeterminate
        size="64"
        :color="
          !$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
        "
      >
      </v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";
//import VFacebookLogin from 'vue-facebook-login-component';
export default {
  name: "Login",
  data() {
    return {
      email: "",
      overlay: false,
      password: "",
      show1: false,
      params: {
        client_id:
          "948525970652-voasdag8fk7qsou5fi1eag5562u5i058.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 460,
        height: 38,
        longtitle: true
      },
    };
  },
  components: {
    GoogleLogin,
    //VFacebookLogin,
  },
  methods: {
    googlelogin() {
      this.overlay = true;
      axios.get(`${this.$store.state.api}/google`).then(response => {
        console.log(response.data);
      });
    },
    onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      this.overlay = true;
      let temp = googleUser.getBasicProfile();
      axios
        .post(`${this.$store.state.api}/register`, {
          fullName: temp.getName(),
          email: temp.getEmail(),
          passwd: "1",
          profileImage: temp.getImageUrl()
        })
        .then(() => {
          axios
            .post(`${this.$store.state.api}/login`, {
              email: temp.getEmail(),
              passwd: "1"
            })
            .then(response => {
              if (response.data == "ERROR") {
                this.$toasted.error("Kullanıcı bulunamadı",{fullWidth:true,icon:'error',duration:2000})

                return;
              } else {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user)
                );
                localStorage.setItem(
                  "wallet",
                  JSON.stringify(
                    JSON.parse(localStorage.getItem("user")).wallet
                  )
                );
                localStorage.setItem("jwt", response.data.token);
                this.overlay = false;
                this.$store.commit("login", true);
              }

              if (localStorage.getItem("jwt") != null) {
                this.$emit("loggedIn");
                if (this.$route.params.nextUrl != null) {
                  this.$router.push(this.$route.params.nextUrl);
                } else {
                  this.$router.push({
                    name: "Home"
                  });
                }
              }
            })
            .catch(err => {
              this.overlay = false;
              this.$toasted.error(err,{fullWidth:true,icon:'error',duration:2000})
            });
        });
    },
    login() {
      if (!this.email && !this.password) {
        this.$toasted.error("Alanlar boş bırakılamaz!",{fullWidth:true,icon:'error',duration:1000})
        return;
      }
      axios
        .post(`${this.$store.state.api}/login`, {
          email: this.email,
          passwd: this.password
        })
        .then(response => {
          if (response.data == "ERROR") {
            this.$toasted.error("Kullanıcı bulunamadı!",{fullWidth:true,icon:'error',duration:1000});
            return;
          } else {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem(
              "wallet",
              JSON.stringify(JSON.parse(localStorage.getItem("user")).wallet)
            );
            localStorage.setItem("jwt", response.data.token);
            this.$store.commit("login", true);
          }

          if (localStorage.getItem("jwt") != null) {
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push({
                name: "Home"
              });
            }
          }
        })
        .catch(err => {
          this.$toasted.error(err,{fullWidth:true,icon:'error',duration:1000});
          console.log(err);
        });
    },
    authenticate: function (provider) {
      this.overlay = true;
      const app = this;
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
        let token = app.$auth.getToken()
        if (provider === 'facebook') {
          app.$http.get('https://graph.facebook.com/v3.0/me?fields=id,name,email,picture', {
            params: { access_token: token }
          }).then(function (response) {
            app.profile = response;
            axios
                .post(`${this.$store.state.api}/register`, {
                  fullName: response.data.name,
                  email: response.data.email,
                  passwd: "1",
                  profileImage: response.data.picture.data.url
                })
                .then(() => {
                  axios
                      .post(`${app.$store.state.api}/login`, {
                        email: response.data.email,
                        passwd: "1"
                      })
                      .then(response => {
                        if (response.data == "ERROR") {
                          alert("Kullanıcı bulunamadı");
                          return;
                        } else {
                          localStorage.setItem(
                              "user",
                              JSON.stringify(response.data.user)
                          );
                          localStorage.setItem(
                              "wallet",
                              JSON.stringify(
                                  JSON.parse(localStorage.getItem("user")).wallet
                              )
                          );
                          localStorage.setItem("jwt", response.data.token);
                          app.overlay = false;
                          app.$store.commit("login", true);
                        }

                        if (localStorage.getItem("jwt") != null) {
                          app.$emit("loggedIn");
                          if (app.$route.params.nextUrl != null) {
                            app.$router.push(app.$route.params.nextUrl);
                          } else {
                            app.$router.push({
                              name: "Home"
                            });
                          }
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      });
                });
          })
        }
      })
    },
    closeYourEyes(){
      document.querySelectorAll('.owll').forEach((el) => {
        el.classList.add('password');
      })
    },
    openYourEyes(){
      document.querySelectorAll('.owll').forEach((el) => {
        el.classList.remove('password');
      })
    }
  }
};
</script>
<style>
.owl {
  margin: auto;
  width: 211px;
  height: 108px;
  background-image: url("https://dash.readme.io/img/owl-login.png");
  position: relative;
}
.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  transform: scaleY(0.6);
  position: absolute;
  left: 14px;
  bottom: -8px;
  transition: 0.3s ease-out;
}
.owl .hand.password {
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
.owl .hand.hand-r {
  left: 170px;
}
.owl .hand.hand-r.password {
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
.owl .arms {
  position: absolute;
  top: 58px;
  height: 41px;
  width: 100%;
  overflow: hidden;
}
.owl .arms .arm {
  width: 40px;
  height: 65px;
  background-image: url("https://dash.readme.io/img/owl-login-arm.png");
  position: absolute;
  left: 20px;
  top: 40px;
  transition: 0.3s ease-out;
}
.owl .arms .arm.password {
  transform: translateX(40px) translateY(-40px);
}
.owl .arms .arm.arm-r {
  left: 158px;
  transform: scaleX(-1);
}
.owl .arms .arm.arm-r.password {
  transform: translateX(-40px) translateY(-40px) scaleX(-1);
}
</style>
