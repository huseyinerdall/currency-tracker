<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      width="100%"
      class="white--text text-center"
      color="rgb(29, 36, 96)"
    >

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>{{ $store.state.appName }}</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
    created() {
    }
  }
</script>
