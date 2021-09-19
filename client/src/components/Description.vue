<template>
  <v-card
    style="border: 1px solid #ddd;border-radius:0;background-color:transparent;"
    :style="$store.state.isLight ? 'color:rgba(0,0,0,0.87);' : 'color:#fff;'"
  >
    <v-card-title v-if="$route.params.coin">{{
      $route.params.coin | uppercase
    }}</v-card-title>
    <v-card-title v-else-if="$route.params.gold">{{ gold }}</v-card-title>

    <v-card-text
      :style="$store.state.isLight ? 'color:rgba(0,0,0,0.87);' : 'color:#fff;'"
      v-html="description"
    >
      {{ description }}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
//import currencies from "@/assets/currencies";
import coins from "@/assets/coins.json";
export default {
  name: "Description",
  props: {
    coin: {
      type: String
    },
    gold: {
      type: String
    }
  },
  data: () => ({
    description: ""
  }),
  created() {
    let sys = "";
    for (let i = 0; i < coins.length; i++) {
      if (coins[i]["name"] == this.$route.params.coin) {
        sys = coins[i]["symbol"].toUpperCase();
        break;
      }
    }
    if (this.$route.params.coin) {
      axios
        .post(`${this.$store.state.admin}/cryptocoindescriptions`, {
          coinName: sys
        })
        .then(response => {
          this.description = response.data;
        });
    } else if (this.$route.params.gold) {
      this.$route.params.gold;
    }
  }
  /*mounted() {
    let tradingViewScript = document.createElement('script');
    tradingViewScript.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js');
    tradingViewScript.innerHTML = `
      {
        "interval": "1m",
        "width": 425,
        "isTransparent": true,
        "height": 450,
        "symbol": "BINANCE:BTCUSDT",
        "showIntervalTabs": true,
        "locale": "tr",
        "colorTheme": "light"
      }
    `;
    document.body.appendChild(tradingViewScript);
  },*/
};
</script>
