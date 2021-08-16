<template>
  <div class="login">
    <v-container>
      <v-row>
        <v-col class="mx-auto col-sm-10 col-xs-12 col-lg-5">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                color="#ffffff"
                dark
                label="İsim Soyisim"
                append-outer-icon="mdi-card-account-details"
                v-model="fullName"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                color="#ffffff"
                dark
                label="E-posta"
                append-outer-icon="mdi-card-account-mail"
                v-model="email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field
                color="#ffffff"
                dark
                label="Parola(Tekrar)"
                append-outer-icon="mdi-key"
                v-model="password2"
                type="password"
                :rules="[rules.confirm, rules.counter]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-file-input
                color="#ffffff"
                dark
                label="Profil görseli yükle"
                append-outer-icon="mdi-camera"
                ref="avatar"
                type="file"
                id="file"
                accept="image/*"
                @change="onFileChanged"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row>
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
            <v-btn
                color="blue"
                class="white--text mx-auto"
                href="/login"
                tile
            >
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
export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      email: "",
      fullName: "",
      password1: "",
      password2: "",
      show1: false,
      show2: false,
      file: "",
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
        confirm: value => this.password1 == value || "Parolalar uyuşmuyor."
      }
    };
  },
  created() {
    this.guestID = "guest" + this.lowProbalityID(1);
    console.log(this.guestID);
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
    register() {
      axios
        .post(`${this.$store.state.api}/register`, {
          fullName: this.fullName || this.guestID,
          email: this.email,
          passwd: this.password1,
          profileImage: this.fullName.toLowerCase().replaceAll(" ", "-")
        })
        .then(res => {
          if (res.data == "ALREADY") {
            alert("Bu eposta çoktan kullanılmış.")
          };
          if (res.data !== "OK") return;
          console.log(res.data)
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push("Activate");
          }
          this.$router.push("Activate");
        });
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
      this.file.fullName = this.fullName || this.guestID;
      const formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(`${this.$store.state.api}/avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            fullName: this.fullName || this.guestID
          },
          body: {
            fullName: this.fullName || this.guestID
          }
        })
        .then(res => {
          if (res.data.success) {
            alert("Yüklendi");
          } else {
            alert("Hata oluştu");
          }
        });
    }
  }
};
</script>
<style scoped></style>
