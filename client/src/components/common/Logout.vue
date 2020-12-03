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
      this.$router.push("/");
    }
  },
};
</script>