<template>
  <div class="user-general-situation">
    <v-container class="pt-2 pb-6 ma-0 mt-lg-6">
      <v-row class="pa-0">
        <v-card
          class="mx-auto align-center d-flex white--text"
          width="344"
          height="100"
          outlined
          color="blue"
        >
          <v-container>
            <v-row class="align-center justify-space-between">
              <v-col class="d-flex column flex-column" cols="8">
                <div class="body1">
                  {{ situation[0] | turkishCurrencyformat }} TRY
                </div>
                <div class="caption">Cüzdan Toplam Değeri</div>
              </v-col>
              <v-col class="d-flex column align-center">
                <v-icon size="76" color="#eee">
                  mdi-wallet-outline
                </v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card
          class="mx-auto align-center d-flex white--text"
          :class="$vuetify.breakpoint.smAndDown ? 'mt-3' : ''"
          width="344"
          height="100"
          outlined
          color="blue"
        >
          <v-container>
            <v-row class="align-center justify-space-between">
              <v-col class="d-flex column flex-column" cols="8">
                <div class="body1">
                  {{ situation[1] | turkishCurrencyformat }} TRY
                </div>
                <div class="caption">Kullanılabilir Bakiye</div>
              </v-col>
              <v-col class="d-flex column align-center">
                <v-icon size="76" color="#eee">
                  mdi-currency-try
                </v-icon>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card
          class="mx-auto align-center d-flex white--text"
          :class="$vuetify.breakpoint.smAndDown ? 'mt-3' : ''"
          width="344"
          height="100"
          outlined
          color="blue"
        >
          <v-container>
            <v-row class="align-center">
              <v-col class="d-flex column flex-column" cols="8">
                <div class="body1 d-flex align-center">
                  {{ situation[2] | turkishCurrencyformat }}
                  PRGR
                  <div class="pb-1">
                    <v-btn icon @click="infoDialog = !infoDialog" x-small>
                      <v-icon>mdi-information</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div class="caption">Kazanılan Guru Coin</div>
              </v-col>
              <v-col class="d-flex column align-center">
                <PRGRIcon :size="48" color="#eee" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
    <v-dialog v-model="infoDialog" max-width="400">
      <v-alert dense type="info" class="mb-0">
        Guru Coin, para.guru temelinde kullanılabilir, para.guru kullanıcıları
        arasında transfer edilebilir, para.guru dışında hiç bir değeri olmayan
        bir para.guru varlığıdır. Guru Coin sembolü PRGR, logosu
        <PRGRIcon :size="16" color="#fff" :inline="false" /> şeklindedir.
        Para.guru kullanıcıları, al sat platformunda alım satım yaparak,
        gerçekleşen alım satım işlemleri ile orantılı olarak PRGR kazanır.
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import PRGRIcon from "./PRGRIcon";
export default {
  name: "UserGeneralSituation",
  data: () => ({
    infoDialog: false
  }),
  components: {
    PRGRIcon
  },
  props: {
    situation: {
      type: Array
    }
  },
  methods: {}
};
</script>
