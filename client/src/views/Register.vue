<template>
  <div class="register">
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
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5 pt-0 pb-0">
          <v-row>
            <v-col cols="12" sm="12" class="pt-0 pb-0">
              <v-text-field
                color="#ffffff"
                dark
                label="Kullanıcı Adı"
                append-outer-icon="mdi-card-account-details"
                v-model="fullName"
                :rules="[rules.required]"
                @input="isUserNameTaken"
                :error-messages="
                  usernametaken ? 'Kullanıcı adı çoktan alınmış' : ''
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0 pb-0">
              <v-text-field
                color="#ffffff"
                dark
                label="E-posta"
                append-outer-icon="mdi-card-account-mail"
                v-model="email"
                :rules="[rules.required, rules.email]"
                @input="isEmailTaken"
                :error-messages="
                  emailtaken ? 'Bu eposta çoktan kullanılmmış.' : ''
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0 pb-0">
              <v-text-field
                color="#ffffff"
                dark
                label="Parola"
                append-outer-icon="mdi-key"
                v-model="password1"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :rules="[rules.counter]"
                @focus="closeYourEyes"
                @blur="openYourEyes"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0 pb-0">
              <v-text-field
                color="#ffffff"
                dark
                label="Parola(Tekrar)"
                append-outer-icon="mdi-key"
                v-model="password2"
                type="password"
                :rules="[rules.confirm, rules.counter]"
                @focus="closeYourEyes"
                @blur="openYourEyes"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="pt-0 pb-0">
              <v-file-input
                color="#ffffff"
                dark
                label="Profil görseli yükle"
                append-outer-icon="mdi-camera"
                ref="avatar"
                type="file"
                id="avatar"
                accept="image/*"
                @change="onFileChanged"
              >
                <v-btn
                  slot="append"
                  color="pink"
                  x-small
                  tile
                  @click="pickAvatar"
                >
                  AVATAR
                </v-btn>
                <v-btn
                  slot="append"
                  color="pink"
                  x-small
                  class="ml-2"
                  @click="upload"
                  tile
                >
                  YÜKLE
                </v-btn>
              </v-file-input>
            </v-col>
            <transition name="slide-fade">
              <v-col v-show="avatarTab" class="avatars mb-4">
                <v-tabs
                  dark
                  background-color="transparent"
                  show-arrows
                  v-model="avatar"
                >
                  <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
                  <v-tab v-for="i in avatars.length" :key="i">
                    <v-avatar size="48px">
                      <img alt="Avatar" :src="avatars[i - 1]" />
                    </v-avatar>
                  </v-tab>
                </v-tabs>
              </v-col>
            </transition>
          </v-row>
          <v-row class="mb-4">
            <v-btn
              color="blue-grey"
              class="white--text mx-auto"
              @click="register"
              tile
            >
              KAYDOL
              <v-icon right dark>
                mdi-login
              </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" class="white--text mx-auto" href="/login" tile>
              GİRİŞ YAP
              <v-icon right dark>
                mdi-login
              </v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import avatars from "@/assets/avatars";
import _ from "lodash";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      fullName: "",
      password1: "",
      password2: "",
      show1: false,
      show2: false,
      file: null,
      guestID: "",
      params: {
        client_id:
          "948525970652-voasdag8fk7qsou5fi1eag5562u5i058.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 90,
        height: 38,
        longtitle: true
      },
      rules: {
        required: value => !!value || "Gerekli alan.",
        counter: value => value.length >= 8 || "Minimum 8 karakter",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Geçersiz email";
        },
        confirm: value => this.password1 == value || "Parolalar uyuşmuyor.",
        usernametaken: () => !this.usernametaken || `Bu kullanıcı adı alınmış.`,
        emailtaken: () => !this.usernametaken || `Bu email adresi kullanılmış.`
      },
      avatars: avatars,
      avatar: 0,
      avatarTab: false,
      usernametaken: false,
      emailtaken: false
    };
  },
  created() {
    this.guestID = "guest" + this.lowProbalityID(1);
  },
  methods: {
    lowProbalityID(c = 2) {
      let ID = "";
      c = +c;
      for (let index = 0; index < c; index++) {
        ID += (Math.random() * Math.random()).toString(32).substring(2);
      }
      return ID;
    },
    isUserNameTaken: _.debounce(function() {
      axios
        .post(`${this.$store.state.api}/isusernametaken`, {
          desired: this.fullName
        })
        .then(res => {
          this.usernametaken = res.data;
        });
    }, 400),
    isEmailTaken: _.debounce(function() {
      axios
        .post(`${this.$store.state.api}/isemailtaken`, {
          desired: this.email
        })
        .then(res => {
          this.emailtaken = res.data;
        });
    }, 400),
    pickAvatar() {
      this.avatarTab = !this.avatarTab;
      this.file = null;
    },
    register() {
      if (this.file) {
        this.file.email = this.email;
        const formData = new FormData();
        formData.append("file", this.file);
        axios
          .post(`${this.$store.state.api}/avatar`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              email: this.email
            },
            body: {
              email: this.email
            }
          })
          .then(res => {
            if (res.data.success) {
              axios
                .post(`${this.$store.state.api}/register`, {
                  fullName: this.fullName || this.guestID,
                  email: this.email,
                  passwd: this.password1,
                  profileImage: this.email + ".jpg"
                })
                .then(res => {
                  if (res.data == "ALREADY") {
                    alert("Bu eposta çoktan kullanılmış.");
                    return;
                  }
                  localStorage.setItem("user", JSON.stringify(res.data));
                  localStorage.setItem("jwt", "activating");
                  if (!res.data) return;
                  if (this.$route.params.nextUrl != null) {
                    this.$router.push(this.$route.params.nextUrl);
                  } else {
                    this.$router.push("Activate");
                  }
                  //this.$router.push("Activate");
                });
            } else {
              console.log("Hata oluştu");
            }
          });
      } else {
        axios
          .post(`${this.$store.state.api}/register`, {
            fullName: this.fullName || this.guestID,
            email: this.email,
            passwd: this.password1,
            profileImage: this.avatars[this.avatar]
          })
          .then(res => {
            if (res.data == "ALREADY") {
              alert("Bu eposta çoktan kullanılmış.");
              return;
            }
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("jwt", "activating");
            if (!res.data) return;
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("Activate");
            }
            this.$router.push("Activate");
          });
      }
    },
    upload() {
      this.$refs.avatar.$refs.input.click();
    },
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
    onFileChanged() {
      this.file = this.$refs.avatar.$refs.input.files[0];
    },
    closeYourEyes() {
      document.querySelectorAll(".owll").forEach(el => {
        el.classList.add("password");
      });
    },
    openYourEyes() {
      document.querySelectorAll(".owll").forEach(el => {
        el.classList.remove("password");
      });
    }
  }
};
</script>
<style>
.avatars .v-tab {
  min-width: 48px !important;
  padding: 0 !important;
}
.avatars .v-slide-group__next,
.v-slide-group__prev {
  min-width: 10px;
}
.avatars.col {
  padding: 10px 0 !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
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
