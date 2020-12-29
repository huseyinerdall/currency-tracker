<template>
  <div>
    <v-text-field
        v-if="!isHomepage"
        v-model="search"
        dark
        color="white"
        append-icon="mdi-magnify"
        label="Kripto para ara"
        single-line
        hide-details
    ></v-text-field>
    <v-data-table
        :headers="headers"
        :items="data"
        item-class="d-none"
        hide-default-footer
        :loading="!coinloaded"
        :items-per-page="itemPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        class="mt-2"
        mobile-breakpoint="0"
        dense
        :search="search"
    >
      <template v-slot:item.image="{ item }">
          <v-avatar size="32">
            <img :src="item.image" alt="">
          </v-avatar>
      </template>
      <template v-slot:item.name="{ item }">
            <router-link :to="{ name: 'Coins', params: { coin: item.name }}" tag="h3" class="body-1 text-uppercase" :style="`font-size: ${$store.state.tdFontSize} !important;`"
            v-if="$vuetify.breakpoint.smAndDown">
              {{ item.name | shorten }}
            </router-link>
        <router-link :to="{ name: 'Coins', params: { coin: item.name }}" tag="h3" class="body-1 text-uppercase" :style="`font-size: ${$store.state.tdFontSize} !important;`"
                     v-else>
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:item.shortName="{ item }">
        <router-link :to="{ name: 'Coins', params: { coin: item.name }}" tag="h3" class="body-1 text-uppercase" :style="`font-size: ${$store.state.tdFontSize} !important;`">{{
            item.shortName | uppercase
          }}
        </router-link>
      </template>
      <template v-slot:item.price="{ item }">
        <h3 :style="`font-size: ${$store.state.tdFontSize} !important;font-weight:400;`" class="text-right">{{ item.price | binayracveondalik }}</h3>
      </template>
      <template v-slot:item.priceTL="{ item }">
        <h3 :style="`font-size: ${$store.state.tdFontSize} !important;font-weight:400;`" class="text-right">{{ (item.price * dolar) | binayracveondalik }}</h3>
      </template>
      <template v-slot:item.pricechange24h="{ item }">
      <span
          :class="[item.pricechange24h>=0 ? 'green--text' : 'red--text']"
          :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.pricechange24h | signint }}</span>
      </template>
      <template v-slot:item.pricechange7d="{ item }">
      <span
          :class="[item.pricechange7d>=0 ? 'green--text' : 'red--text']"
          :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.pricechange7d | signint }}</span>
      </template>
      <template v-slot:item.time="{ item }">
        <span :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.time | onlyTime }}</span>
      </template>
      <template v-slot:item.market_cap="{ item }">
        <span :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.market_cap | currencyformat }}</span>
      </template>
      <template v-slot:item.volume="{ item }">
        <span :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.volume | currencyformat }}</span>
      </template>

    </v-data-table>
    <v-pagination
        v-if="!isHomepage"
        v-model="page"
        :length="pageCount"
    ></v-pagination>
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
      page: 1,
      pageCount: 0,
      itemPerPage: 50,
      headers: [{
        text: '',
        align: 'start',
        sortable: false,
        value: 'image',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      },{
        text: 'Kurlar',
        align: 'start',
        sortable: false,
        value: 'name',
        class: 'amber--text accent-3 body-1',
      }, {
          text: 'Sembol',
          align: 'start',
          sortable: false,
          value: 'shortName',
          class: 'amber--text accent-3 body-1',
      },{
        text: 'Fiyat(USD)',
        value: 'price',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      }, {
        text: 'Fiyat(TL)',
        value: 'priceTL',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      }, {
          text: 'Değeri',
          value: 'market_cap',
          sortable: false,
          align: 'right',
          class: 'amber--text accent-3 body-1',
        filterable: false,
      },{
        text: 'Piyasa Hacmi',
        value: 'volume',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      }, {
        text: 'Fark (24S)',
        value: 'pricechange24h',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      }, {
        text: 'Fark (7G)',
        value: 'pricechange7d',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      }, {
        text: 'Saat',
        value: 'time',
        sortable: false,
        align: 'right',
        class: 'amber--text accent-3 body-1',
        filterable: false,
      },],
      data: [],
      dolar: 1,
      search: '',
    }
  },
  created() {
    let app = this;
    app.isHomepage = app.$route.path == '/';
    if(this.$vuetify.breakpoint.smAndDown){
      this.headers.splice(0,1); // bitcoin logoları mobil
      this.headers.splice(1,1);
      this.headers.splice(2,3);
      this.headers.splice(3,1);
    }
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("coins", fetchedData => {
      app.data = fetchedData;
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
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
  border-bottom: thin solid #444767 !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
  border-bottom: thin solid #444767 !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th{
  padding: 0 10px !important;
}
</style>