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
          <v-btn
            color="blue-grey"
            class="white--text mx-auto"
            @click="register"
          >
            KAYDOL
            <v-icon right dark>
              mdi-login
            </v-icon>
          </v-btn>
          <v-btn style="background:#de5246;" class="white--text float-right">
            Google
            <v-icon right dark>
              mdi-google
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

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
      file: "",
      guestID: "",
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
          if (res.data !== "OK") return;
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push("Activate");
          }
          this.$router.push("Activate");
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
