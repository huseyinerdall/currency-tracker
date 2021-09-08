<template>
  <div class="404">
    <v-container>
      <v-row>
        <v-sheet
            class="mx-auto mt-4"
            height="400"
            max-height="80%"
            width="660"
            max-width="90%"
            style="background: rgba(0,0,0,.4) !important;"
        >
          <div class="mt-6 display-1 white--text text-center">Hesabını Aktif Et</div>
          <div class="body-1 mx-auto mt-4 white--text" style="width: 80%;">
            Kayıt olduğunuz eposta adresinize
            <v-chip small>{{user.email}}</v-chip>
            bir ileti attık ve buradaki bağlantıyı kullanarak hesabını aktif hale getirebilirsin.Eğer gelen kutunda görünmüyorsa gereksiz klasörünü kontrol edebilirsin.
          </div>
          <div class="row justify-space-around mt-4">
            <v-btn
                tile
                color="rgb(2, 192, 118)"
                @click="sendactivation"
                :loading="emailsending"
                :disabled="emailsending"
            >Tekrar gönder</v-btn>
            <v-btn href="/" tile>Anasayfa</v-btn>
          </div>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};
export default {
  name: "Activate",
  data() {
    return {
      emailsending: false,
      user: {}
    }
  },
  created(){
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  components: {},
  methods: {
    sendactivation() {
      this.emailsending = true;
      axios
          .post(`${this.$store.state.api}/sendactivation`, {
            email: this.user.email,
            userId: this.user.id,
            url: this.$store.state.api
          })
          .then(res => {
            if (res.data == "MAILOK") {
              this.$toasted.show(
                  `Eposta başarılı bir şekilde gönderildi.Gelen kutunuzu kontrol edebilirsiniz.`,
                  options
              );
              this.emailsending = false;
            }
          });
    }
  }
};
</script>
<style>
.mainbox {
  background-color: transparent;
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
}
</style>
