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
            <v-col cols="3">
              <v-btn color="blue-grey" class="white--text" @click="login" tile>
                GİRİŞ
                <v-icon right dark>
                  mdi-login
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="5">
              <GoogleLogin :params="params" :onSuccess="onSuccess">
                <v-btn color="red darken-1" class="white--text" tile>
                  Google ile
                  <v-icon right dark>
                    mdi-google
                  </v-icon>
                </v-btn>
              </GoogleLogin>
            </v-col>
            <v-col cols="4">
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
        width: 250,
        height: 50,
        longtitle: true
      }
    };
  },
  components: {
    GoogleLogin
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
      console.log(googleUser)
      let temp = googleUser.getBasicProfile();
      console.log(temp.getEmail())
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
    }
  }
};
</script>
<style scoped></style>
