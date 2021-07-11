<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5">
          <v-text-field
            color="white"
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
          <GoogleLogin :params="params" :onSuccess="onSuccess">
            <v-btn color="red darken-1" class="white--text" tile block width="460">
              Google İle
              <v-icon right dark>
                mdi-google
              </v-icon>
            </v-btn>
          </GoogleLogin>
          <v-btn
              color="#3b5998"
              class="white--text mt-2"
              block tile
              @click="authenticate('facebook')">
            Facebook İLE
            <v-icon right dark>
              mdi-facebook
            </v-icon>
          </v-btn>
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
              email: temp["Mt"],
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
              console.log(err);
            });
        });
    },
    login() {
      if (!this.email && !this.password) {
        alert("Alanlar boş bırakılamaz!");
        return;
      }
      axios
        .post(`${this.$store.state.api}/login`, {
          email: this.email,
          passwd: this.password
        })
        .then(response => {
          if (response.data == "ERROR") {
            alert("Kullanıcı bulunamadı");
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
                      .post(`${this.$store.state.api}/login`, {
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
                        console.log(err);
                      });
                });
          })
        }
      })
    }
  }
};
</script>
<style scoped></style>
