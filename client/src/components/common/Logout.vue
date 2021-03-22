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
      this.$router.go(0);
    }
  },
  created() {
    this.logout();
  }
};
</script>