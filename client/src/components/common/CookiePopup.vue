<template>
  <div class="text-center">
    <v-snackbar
        v-model="$store.state.cookiepopup"
        :vertical="vertical"
        timeout="-1"
        width="600"
        color="rgb(29, 36, 96)"
        max-width="400"

    >
      <v-container style="font-size: 12px;border: 1px solid #ddd;border-radius:0;" class="row">
          <v-row>
            <v-col>
              {{ text }}
            </v-col>
            <v-col cols="2">
              <v-btn
                  text
                  tile
                  small
                  class="ml-2"
                  right
                  @click="$store.commit('cookiepopup',false)"
                  style="border: 1px solid #ddd;"
              >
                Tamam
              </v-btn>
            </v-col>
          </v-row>
      </v-container>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    text: 'Para.guru, en iyi kullanıcı deneyimi sağlamak için çerez kullanmaktadır. Sitemizi kullanarak çerezlere izin vermektesiniz.',
    vertical: true,
  }),
}
</script>
<style>
.v-snack__content{
  padding-top: 4px !important;
  padding-bottom: 0 !important;
}
</style>