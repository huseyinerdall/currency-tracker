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
export default {
  name: "Activating",
  data: () => ({}),
  created() {
    let temp = JSON.parse(localStorage.getItem('user'));
    temp.active = 1;
    localStorage.setItem('user',JSON.stringify(temp));
    this.$router.push({
      name: "UserWallet"
    });
  }
};
</script>
