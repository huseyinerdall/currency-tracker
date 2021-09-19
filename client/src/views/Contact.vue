<template>
  <div class="contact">
    <v-container class="pa-0">
      <v-row
        align="center"
        class="mx-auto mt-4"
        :style="$vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width: 50%;'"
      >
        <v-col cols="12">
          <h1 class="white--text">&bull; Bize iletin &bull;</h1>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            label="İsim Soyisim"
            dark
            v-model="fullName"
            outlined
            style="font-size: 14px;"
            :style="
              $vuetify.breakpoint.smAndDown ? 'width:100%;' : 'width: 90%;'
            "
            hide-details
            dense
            clearable
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field
            label="E-posta"
            dark
            type="email"
            v-model="email"
            outlined
            style="width: 100%;font-size: 14px;"
            hide-details
            dense
            clearable
          ></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="12">
          <v-select
            :items="['Destek', 'Talep', 'Şikayet', 'Yasal Bilgilendirme']"
            label="Konu neydi?"
            dark
            v-model="choice"
            outlined
            style="width: 100%"
            hide-details
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
            name="input-7-1"
            label="Mesajınızı yazabilirsiniz."
            value=""
            v-model="message"
            dark
            outlined
            hide-details
            dense
          ></v-textarea>
        </v-col>
        <v-col>
          <v-btn block color="pink" dark @click="sendUs" :loading="sending">
            Gönder
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import "../../node_modules/material-icons/iconfont/material-icons.scss";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};
let alertoptions = {
  type: "error",
  icon: "error",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "red accent-3 text-center",
  className: "text-center"
};
export default {
  name: "Contact",
  data() {
    return {
      choice: "",
      fullName: "",
      email: "",
      message: "",
      sending: false
    };
  },
  created() {
    try {
      let { fullName, email } = this.$store.state.userinfo;
      this.fullName = fullName; //this.$store.state.userinfo.fullName;
      this.email = email; //this.$store.state.userinfo.email;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    sendUs() {
      this.$store.commit("isEmailSending", true);
      this.sending = true;
      axios
        .post(`${this.$store.state.api}/contact`, {
          fullName: this.fullName,
          email: this.email,
          subject: this.choice,
          message: this.message
        })
        .then(result => {
          if (result.data === "MAILOK") {
            this.sending = false;
          }
          this.$store.commit("isEmailSending", false);
          this.$toasted.show(
            `Emailiniz bize ulaştı.En kısa sürede dönüş sağlanacaktır.`,
            options
          );
        })
        .catch(err => {
          this.$toasted.show(`${err}`, alertoptions);
          this.sending = false;
        });
    }
  }
};
</script>
