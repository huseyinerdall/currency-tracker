<template>
  <v-dialog
      transition="dialog-bottom-transition"
      max-width="700"
      style="border-radius:0 !important;"
      v-model="$store.state.userorderdialog"
  >

    <v-container style="border: 1px solid #ddd;border-radius:0;position:relative;"
                 :style="$store.state.isLight ? 'background-color:#f9f9f9;' : 'background-color:rgba(11,14,63,0.8);'">
      <v-tabs
          v-model="tab"
          background-color="transparent"
          light
          grow
          height="30"
      >
        <v-tab
            v-for="item in items"
            :key="item"
            :class="$store.state.isLight ? '' : 'white--text'"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-data-table
              :headers="openHeaders"
              :items="open"
              dense
              mobile-breakpoint="0"
              hide-default-footer
              :items-per-page="itemPerPage"
              item-class="text--white"
              style="border: 1px solid #ddd;border-radius:0;"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td
                    :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["CoinOrCurrency"]}}</span>
                </td>
                <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["Parameter"]}}</span>
                </td>
                <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <v-chip
                      class="ma-2"
                      color="rgb(2, 192, 118)"
                      label
                      text-color="white"
                      x-small
                      v-if="item['buyOrSell']=='buy'"
                  >
                    ALIM&nbsp;
                  </v-chip>
                  <v-chip
                      class="ma-2"
                      color="rgb(248, 73, 96)"
                      label
                      text-color="white"
                      x-small
                      v-else
                  >
                    SATIM
                  </v-chip>
                </td>
                <td
                    class="text-right"
                    :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["createdAt"]|dateStandartFormat}}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table
              :headers="closedHeaders"
              :items="closed"
              dense
              mobile-breakpoint="0"
              hide-default-footer
              :items-per-page="itemPerPage"
              style="border: 1px solid #ddd;border-radius:0;"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["CoinOrCurrency"]}}</span>
                </td>
                <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["Parameter"]}}</span>
                </td>
                <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <v-chip
                      class="ma-2"
                      color="rgb(2, 192, 118)"
                      label
                      text-color="white"
                      x-small
                      v-if="item['buyOrSell']=='buy'"
                  >
                    ALIM&nbsp;
                  </v-chip>
                  <v-chip
                      class="ma-2"
                      color="rgb(248, 73, 96)"
                      label
                      text-color="white"
                      x-small
                      v-else
                  >
                    SATIM
                  </v-chip>
                </td>
                <td
                    class="text-right"
                    :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
                  <span class="white--text">{{item["updatedAt"]|dateStandartFormat}}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
import axios from "axios";
import io from "socket.io-client";
export default {
  name: "UserOrderModal",
  data: () => ({
    data: [],
    openHeaders: [
      {
      text: 'Piyasa',
      sortable: false,
      value: 'CoinOrCurrency',
      class:'white--text'
    },
      {
        text: 'Koşul',
        value: 'Parameter',
        sortable: false,
        class:'white--text'
      },
      {
        text: 'Emir',
        value: 'buyOrSell',
        sortable: false,
        class:'white--text'
      },
      {
        text: 'Tarih',
        value: 'createdAt',
        sortable: false,
        class:'white--text',
        align:'end'
      }
    ],
    closedHeaders: [{
      text: 'Piyasa',
      sortable: false,
      value: 'CoinOrCurrency',
      class:'white--text'
    },
      {
        text: 'Koşul',
        value: 'Parameter',
        sortable: false,
        class:'white--text'
      },
      {
        text: 'Emir',
        value: 'buyOrSell',
        sortable: false,
        class:'white--text'
      },
      {
        text: 'Tarih',
        value: 'updatedAt',
        sortable: false,
        class:'white--text',
        align:'end'
      }
    ],
    open: null,
    closed: null,
    allUnits: [],
    dolar: 1,
    itemPerPage: 10,
    walletLoaded: false,
    tab: null,
    items: [
      'AÇIK EMİRLERİM', 'GERÇEKLEŞMİŞ EMİRLERİM'
    ],
  }),
  created() {
    let app = this;
    axios.get('https://finans.truncgil.com/today.json')
        .then(response =>{
          app.dolar = parseFloat(response.data["ABD DOLARI"]["Satış"]);
        })
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("allprices", fetchedData => {
      localStorage.setItem('allprices',JSON.stringify(fetchedData));
    });
    if(localStorage.getItem('user')){
      this.getUserOpenOrders();
      this.getUserClosedOrders();
    }
  },
  methods: {
    getUserOpenOrders: function(){
      this.walletLoaded = false;
      axios.post(`${this.$store.state.api}/getopenorder`, {
        userId: JSON.parse(localStorage.getItem('user')).id
      })
          .then((response) => {
            this.open = response.data;
          })
          .catch(err => {
            console.log(err);
          })
    },
    getUserClosedOrders: function(){
      this.walletLoaded = false;
      axios.post(`${this.$store.state.api}/getclosedorder`, {
        userId: JSON.parse(localStorage.getItem('user')).id
      })
          .then((response) => {
            this.closed = response.data;
          })
          .catch(err => {
            console.log(err);
          })
    }
  },
  computed: mapState({
    userorderdialog: state => state.userorderdialog,
  })
};
</script>
<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, .3) !important;
  background-attachment: fixed;
}
.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: rgba(0, 0, 0, .3) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, .3) !important;
}
.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: rgba(0,0,0,0.3) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #444767 !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0 10px !important;
}
.v-dialog{
  border-radius: 0 !important;
}
.theme--light.v-btn.v-btn--disabled .v-icon, .theme--light.v-btn.v-btn--disabled .v-btn__loading{
  color:rgba(255,255,255,.5) !important;
}
</style>
<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: rgba(0, 0, 0, .3) !important;
}
h3{
  cursor: pointer;
}
.v-data-table__wrapper thead{
  border-bottom: 1px solid #5e6593 !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
  border-bottom-color: #ddd !important;
}
.pinkk{
  color:#ff3366 !important;
}
.theme--light.v-data-table{
  background-color: rgba(0,0,0,.3) !important;
}
.theme--light.v-data-table .v-data-table__empty-wrapper{
  color: #fff !important;
}
</style>
