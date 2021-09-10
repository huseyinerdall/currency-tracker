<template>
  <div class="home">
    <v-container class="pa-0 pt-4">
      <v-row>
        <v-col>
          <template>
            <v-card
                max-width="500"
                class="mx-auto"
                color="transparent"
            >
              <v-row class="align-center pl-4">
                <v-avatar
                    size="100"
                >
                  <v-img
                      :src="exchange.image"
                      dark
                  >
                  </v-img>
                </v-avatar>
                <h2 class="ml-2 white--text">{{exchange.name}}</h2>
              </v-row>
              <v-list two-line color="transparent" dark>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="white">
                      mdi-web
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title><a style="color: #fff;" :href="exchange.url" target="_blank">{{ exchange.url }}</a></v-list-item-title>
                    <v-list-item-subtitle>Website</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="white">
                      mdi-swap-horizontal-bold
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{exchange.trade_volume_24h_btc | turkishCurrencyformat}} BTC</v-list-item-title>
                    <v-list-item-subtitle>24 saatlik toplam hacim</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="white">
                      mdi-domain
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{exchange.year_established}}</v-list-item-title>
                    <v-list-item-subtitle>Kuruluş yılı</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="white">
                      mdi-shield-check
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      <div class="row pl-2">
                        <v-rating
                            :value="exchange.trust_score/2"
                            background-color="white"
                            color="#e91e63"
                            dense
                            small
                            :x-small="$vuetify.breakpoint.smAndDown"
                            readonly
                            half-increments
                            hover
                        ></v-rating>
                        <span class="grey--text text--lighten-2 text-caption mr-2">({{ exchange.trust_score/2 }})</span>
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>Güvenilirlik</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </template>
        </v-col>
        <v-col>
          <v-data-table
              :headers="headers"
              :items="tickers"
              hide-default-footer
              disable-pagination
              style="border: 1px solid #ddd;border-radius:0;"
              fixed-header
              :style="[
            $store.state.isLight
                ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
                : 'color:#ffffff;background-color:rgba(0,0,0,.3);'
           ]"
              mobile-breakpoint="0"
              class="mt-1"
              dense
              :dark="!$store.state.isLight"
              :light="$store.state.isLight"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td
                    :style="[
                      $store.state.isLight
                        ? 'color:rgba(0,0,0,0.87) !important;border-color:#ddd !important;'
                        : 'color:#ffffff !important;'
                    ]"
                >
                  <a
                      :href="item.trade_url"
                      tag="span"
                      target="_blank"
                      class="caption"
                      style="color: #fff;text-underline: none;"
                      :style="
                    `font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`
                  "
                  >
                    {{item.base}}/{{item.target}}
                  </a>
                </td>
                <td
                    style="font-size: 12px;"
                    :style="[
                      $store.state.isLight
                      ? 'color:rgba(0,0,0,0.87) !important;border-color:#ddd !important;'
                      : 'color:#ffffff !important;'
                    ]"
                >
                  {{ (item.last) | turkishCurrencyformat}}
                </td>
                <td
                    style="font-size: 12px;"
                    :style="[
                      $store.state.isLight
                      ? 'color:rgba(0,0,0,0.87) !important;border-color:#ddd !important;'
                      : 'color:#ffffff !important;'
                    ]"
                >
                  {{ (item.volume) | turkishCurrencyformat}}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-overlay
          :opacity="1"
          :value="overlay"
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
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "ExchangeDetailsPage",
  data(){
    return {
      overlay: false,
      data: [],
      exchanges: JSON.parse(localStorage.getItem('exchanges')),
      exchange: null,
      tickers: [],
      headers: [
        {
          text: "Kripto Çifti",
          align: "start",
          sortable: false,
          value: "base",
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption",
          width: "100px"
        },
        {
          text: "Değeri",
          value: "last",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption"
        },
        {
          text: "Hacim",
          value: "volume",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption"
        },
      ],
    }
  },
  metaInfo() {
    return {
      title:
          "Para.Guru | " + this.$route.params.exchangeid,
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
              "Kripto para borsaları hakkında bilgiler."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
              "Kripto para borsaları"
        }
      ]
    };
  },
  props: {
    exchangeid: {
      type: String
    }
  },
  created() {
    axios.get(`${this.$store.state.api}/borsalar/${this.exchangeid}`).then(response => {
      this.tickers = response.data.tickers;
    });
    this.exchange = this.exchanges.find((v) => {
      return v.id == this.$route.params.exchangeid;
    })
  }
};
</script>
