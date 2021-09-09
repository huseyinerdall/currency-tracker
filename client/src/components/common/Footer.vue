<template>
  <v-footer dark padless>
    <v-card
      flat
      width="100%"
      class="text-center"
      :style="[
        $store.state.isLight
          ? 'color:#000 !important;'
          : 'color:#fff !important;'
      ]"
      :color="
        $store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
      "
    >
      <v-divider></v-divider>

      <v-card-text
        :class="[$store.state.isLight ? 'black--text' : 'white--text']"
      >
        {{ new Date().getFullYear() }} —
        <strong>{{ $store.state.appName }}</strong>
      </v-card-text>
      <v-card-text>
        <v-btn href="/iletisim" x-small tile text link>
          İLETİŞİM
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  }),
  created() {}
};
</script>
