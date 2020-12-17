<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  name: "Logout",
  data: () => ({
  }),
  methods: {
    logout: function () {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      console.log("logout")
      this.$router.push("/");
    }
  },
  created() {
    this.logout();
  }
};
</script>