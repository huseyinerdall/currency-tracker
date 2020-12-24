<template>
  <div>
    <v-chip
        class="mt-3 amber accent-3"
        label
    >
      Kripto Kurlar
    </v-chip>
    <v-data-table
        :headers="headers"
        :items="data"
        item-class="d-none"
        hide-default-footer
        :loading="!coinloaded"
        disable-pagination
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        class="mt-1"
        mobile-breakpoint="0"
        dense
    >
      <template v-slot:item.shortName="{ item }">
        <v-row >
          <v-col cols="5" sm="5" class="pa-0 pa-lg-2"  v-if="!isHomepage && $vuetify.breakpoint.mdAndUp">
            <v-avatar size="32" class="mt-2">
              <img :src="item.image" alt="">
            </v-avatar>
          </v-col>
          <v-col :class="[isHomepage || $vuetify.breakpoint.smAndDown ? 'pa-0' : 'pa-2 pl-0']">
            <router-link :to="{ name: 'Coins', params: { coin: item.name }}" tag="h3">{{
                item.shortName | uppercase
              }}
            </router-link>
            <h4 v-if="!isHomepage" style="font-weight:400;">{{ item.name }}</h4>
          </v-col>
        </v-row>
      </template>
      <template v-slot:item.price="{ item }">
        <h3 style="font-weight:400;font-size:12px;" class="text-right">{{ item.price.toFixed(4) }}</h3>
      </template>
      <template v-slot:item.priceTL="{ item }">
        <h3 style="font-weight:400;font-size:12px;" class="text-right">{{ (item.price * dolar).toFixed(4) }}</h3>
      </template>
      <template v-slot:item.pricechange24h="{ item }">
      <span
          :class="[item.pricechange24h>=0 ? 'green--text' : 'red--text']"
          style="font-size:10px;">{{ item.pricechange24h | signint }}</span>
      </template>
      <template v-slot:item.pricechange7d="{ item }">
      <span
          :class="[item.pricechange7d>=0 ? 'green--text' : 'red--text']"
          style="font-size:10px;">{{ item.pricechange7d | signint }}</span>
      </template>
      <template v-slot:item.time="{ item }">
        <span style="font-size:10px;">{{ item.time | onlyTime }}</span>
      </template>

    </v-data-table>
    <v-overlay
        :opacity="1"
        :value="overlay"
        color="rgb(29, 36, 96)"
    >
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </div>
</template>


<script>
//import axios from "axios";
//import coins from '../assets/coins.json';
import io from "socket.io-client";

export default {
  data() {
    return {
      coinloaded: true,
      isHomepage: true,
      overlay: true,
      headers: [{
        text: 'Kurlar',
        align: 'start',
        sortable: false,
        value: 'shortName',
        class: 'amber--text accent-3 font-weight-light body-1',
      },{
        text: 'Fiyat(USD)',
        value: 'price',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Fiyat(TL)',
        value: 'priceTL',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Fark',
        value: 'pricechange24h',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Piyasa Hacmi',
        value: 'volume',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Fark (24S)',
        value: 'pricechange24h',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Fark (7G)',
        value: 'pricechange7d',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      }, {
        text: 'Saat',
        value: 'time',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 font-weight-light body-1',
      },],
      data: [],
      dolar: 1,
    }
  },
  created() {
    let app = this;
    app.isHomepage = app.$route.path == '/';
    var socket = io.connect(`http://${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("coins", fetchedData => {
      app.data = fetchedData.splice(0,60);
      app.overlay = false;
    });
    socket.on("dolar", fetchedData => {
      app.dolar = fetchedData;
    });
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, .1) !important;
  background-attachment: fixed;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, .3) !important;
}

td {
  color: white !important;
}

h3 {
  cursor: pointer;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
</style>
<style>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent !important;
}
</style>