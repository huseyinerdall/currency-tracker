<template>
  <v-container>
    <v-overlay
      :opacity="1"
      :value="true"
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
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Activating",
  data: () => ({}),
  created() {
    axios
      .post(`${this.$store.state.api}/activate`, {
        activationcode: this.$route.params.activationcode,
        userid: this.$route.params.userid
      })
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem(
          "wallet",
          JSON.stringify(JSON.parse(localStorage.getItem("user")).wallet)
        );
        localStorage.setItem("jwt", response.data.token);
        this.$store.commit("login", true);
        if (localStorage.getItem("jwt") != null) {
          this.$emit("loggedIn");
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl);
          } else {
            this.$router.push({
              name: "UserWallet"
            });
          }
        }
      });
  }
};
</script>
