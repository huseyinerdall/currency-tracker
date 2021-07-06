<template>
  <div id="app">
    <div>
      <v-row>
        <v-col class="col-md-12">

          <v-row>
            <v-col cols="12" md="6">
              <div style="border: 1px solid #ddd;border-radius:6px;">
                <v-row>
                  <v-col class="ml-2">
                    <h3 class="white--text">₺{{ balanceNow | turkishCurrencyformat }}</h3>
                  </v-col>
                  <v-col class="ml-4" :set="change = userBalanceList[0]['data'][userBalanceList[0]['data'].length-1]-userBalanceList[0]['data'][0]">
                    <h4 :class="(change >= 0) ? 'green--text' : 'red--text'">{{change | signint }}</h4>
                  </v-col>
                  <v-col>
                    <v-select
                        style="margin-top: -10px;"
                        :items="timeOptions"
                        item-text="text"
                        item-value="time"
                        solo
                        dense
                        light
                        :value="select"
                        @change="setChart"
                    ></v-select>
                  </v-col>
                </v-row>
                <apexchart
                    ref="realtimeChart"
                    class="ma-0 pa-0"
                    type="line"
                    height="330"
                    :options="chartOptions"
                    :series="userBalanceList"
                ></apexchart>
              </div>
            </v-col>

            <v-col cols="12" md="6">
              <v-data-table
                  :headers="headers"
                  :items="data"
                  dense
                  mobile-breakpoint="0"
                  hide-default-footer
                  :items-per-page="itemPerPage"
                  no-data-text=""
                  style="border: 1px solid #ddd;border-radius:6px;"
                  :dark="!$store.state.isLight"
                  :light="$store.state.isLight"
                  sort-by.sync="amount"
                  loading="true"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>
                      {{item.shortName | uppercase}}
                    </td>
                    <td>
                      {{(allPrices[item.shortName] || allPrices[shortNames[item.shortName]]) | turkishCurrencyformat }}
                    </td>
                    <td>
                      {{item.amount | tofixedftwo}}
                    </td>
                    <td>
                      <div v-if="item.shortName != 'TRY'">
                        <span
                            :class="[
                            (parseFloat((allPrices[item.shortName] || allPrices[shortNames[item.shortName]])*item.amount)-parseFloat(item.cost)) >= 0
                              ? 'green--text'
                              : 'red--text'
                          ]">
                          {{(parseFloat((allPrices[item.shortName] || allPrices[shortNames[item.shortName]])*item.amount)-parseFloat(item.cost)) | signint}}
                        </span>
                      </div>
                      <div v-else>-</div>
                    </td>
                    <td>
                      {{ ((allPrices[item.shortName] || allPrices[shortNames[item.shortName]])*item.amount) | turkishCurrencyformat}}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row>

              <v-col cols="12" md="6">
                  <v-data-table
                      :headers="orderHeaders"
                      :items="orders"
                      dense
                      mobile-breakpoint="0"
                      hide-default-footer
                      :items-per-page="itemPerPage"
                      item-class="text--white"
                      no-data-text="Henüz herhangi bir emir vermediniz."
                      style="border: 1px solid #ddd;border-radius:6px;"
                      :style="[
                        $store.state.isLight
                          ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
                          : 'color:#ffffff !important;background-color:rgba(0,0,0,.3);'
                      ]"
                      :dark="!$store.state.isLight"
                      :light="$store.state.isLight"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td v-if="!$vuetify.breakpoint.smAndDown"
                            :class="{ 'black--text': $store.state.isLight }">
                          <v-row class="align-center">
                            <v-avatar size="32" class="ml-2 mr-2">
                              <img :src="allImages[item.CoinOrCurrency] || $store.state.api + '/gold.png'" alt="" />
                            </v-avatar>
                            <div class="d-flex flex-column">
                              <span>{{item.CoinOrCurrency}}</span>
                              <span v-if="item.buyOrSell=='buy'">ALIŞ</span>
                              <span v-else>SATIŞ</span>
                            </div>
                          </v-row>
                        </td>
                        <td :class="{ 'black--text': $store.state.isLight }">
                          <div>
                            {{item.buyOrSell=='buy' ? '+' : '-'}}
                            {{item.Amount}}
                          </div>
                        </td>
                        <td>
                          <div class="d-flex flex-column">
                            <span v-text="item.OrderType == 'time' ? 'Tarihe Göre' : 'Fiyata Göre'"></span>
                            <span style="font-size: 11px;" v-if="item.OrderType == 'time'">{{ (item.Parameter.indexOf('z') > 0 ? new Date(item.Parameter).toLocaleString('tr') : new Date(item.createdAt).toLocaleDateString() )}}</span>
                            <span v-else>{{item.Parameter}}</span>
                          </div>
                        </td>
                        <td>
                          <v-btn
                              min-width="0"
                              class="pa-0"
                              x-small
                              color="transparent"
                              @click="buySellNow(
                                item.id,
                                item.buyOrSell,
                                item.CoinOrCurrency,
                                item.Amount
                              )"
                              :disabled="item.Closed == 1"
                          >
                            <v-icon size="16" color="rgba(255,255,255,0.5)">
                              mdi-check-outline
                            </v-icon>
                          </v-btn>

                          <v-btn
                              min-width="0"
                              class="pa-0"
                              x-small
                              color="transparent"
                              :disabled="item.Closed == 1"
                          >
                            <v-icon size="16" color="rgba(255,255,255,0.5)">
                              mdi-pencil-outline
                            </v-icon>
                          </v-btn>
                          <v-btn
                              :disabled="item.Closed == 1 || item.Closed == -1"
                              min-width="0"
                              class="pa-0"
                              x-small
                              color="transparent"
                              @click="deleteOrder(item.id)"
                          >
                            <v-icon size="16" color="rgba(255,255,255,0.5)" class="ml-1">
                              mdi-close-outline
                            </v-icon>
                          </v-btn>
                        </td>
                        <td>
                          <div v-if="item.Closed == 1">
                            <span class="green--text">GERÇEKLEŞTİ</span>
                          </div>
                          <div v-else-if="item.Closed == -1">
                            <span class="yellow--text">İPTAL EDİLDİ</span>
                          </div>
                          <div v-else>
                            <span class="red--text">BEKLİYOR</span>
                          </div>
                        </td>
                        <td>
                          <div class="text-right">
                            {{item.createdAt | dateStandartFormat}}
                          </div>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
              </v-col>

              <v-col cols="12" md="6">
                <v-data-table
                    :headers="topUserHeaders"
                    :items="topUsers"
                    dense
                    mobile-breakpoint="0"
                    hide-default-footer
                    :items-per-page="itemPerPage"
                    item-class="text--white"
                    style="border: 1px solid #ddd;border-radius:6px;"
                    :dark="!$store.state.isLight"
                    :light="$store.state.isLight"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>
                        <v-row class="align-center">
                          <span class="ml-4 mr-4" v-html="(+item.sirano < 4) ? item.sirano+'*' : item.sirano+'&nbsp;&nbsp;'"></span>
                          <v-avatar size="32" class="ml-2 mr-2" v-if="item.profileImage == ''">
                            <img :src="$store.state.api + '/defaultuserprofileimage.png'" alt="" />
                          </v-avatar>
                          <v-avatar size="32" class="ml-2 mr-2" v-else>
                            <img :src="item.profileImage.indexOf('googleusercontent')>0 ? item.profileImage : ($store.state.api + '/uploads/' + item.profileImage)" alt="" />
                          </v-avatar>
                          <span>{{item.fullName | tocapitalize}}</span>
                        </v-row>
                      </td>
                      <td>
                        ₺{{item.balanceNow | turkishCurrencyformat}}
                      </td>
                      <td>
                        {{(Object.values(item.graph)[0]/(item.graph['total']))*200}}-
                        {{(Object.values(item.graph)[1]/(item.graph['total']))*200}}
                        <v-row class="pa-0">
                          <span style="font-size:10px;" class="red text-center" :style="'width:'+(Object.values(item.graph)[0]/(item.graph['total']))*200+'px;'">{{ Object.keys(item.graph)[0] | tocapitalize }}</span>
                          <span style="font-size:10px;" class="green text-center" v-if="Object.keys(item.graph)[1] != 'undefined' || Object.values(item.graph)[1] != 0" :style="'width:'+(Object.values(item.graph)[1]/(item.graph['total']))*200+'px;'">{{ Object.keys(item.graph)[1] | tocapitalize }}</span>
                          <span style="font-size:10px;" class="grey text-center" v-if="item.graph['diger']!=0 && item.graph['diger']!=undefined" :style="'width:'+item.graph['diger']/(item.graph['total'])+'px;'">DİĞER</span>
                        </v-row>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
        </v-col>

      </v-row>

    </div>

  </div>
</template>

<script>
//import axios from "axios";

import axios from "axios";
import io from "socket.io-client";
import {mapState} from "vuex";
import { setGraph } from "@/functions";
import shortNames from "@/assets/shortname-convert";
import allImages from "@/assets/allimages";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};/*
let alertoptions = {
  type: "error",
  icon: "error",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "red accent-3 text-center",
  className: "text-center"
};*/
export default {
  name: "UserWallet",
  data(app) {
    return {
      i:1,
      userBalanceList: [
        {
          data: [1,2,3,4,56,8]
        }
      ],
      timeOptions: [
        { text: 'Günlük', time: 1 },
        { text: 'Haftalık', time: 7 },
        { text: 'Aylık', time: 30 },
        { text: 'Yıllık', time: 999 }
      ],
      select: { text: 'Haftalık', time: 7 },
      chartOptions: {
        chart: {
          type:"area",
          //stacked: false,
          height: 350,
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false,
              selection: true,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: true
            },
          },
          xaxis: {
            tickAmount: 6,
            labels: {
              style: {
                colors: app.$store.state.isLight ? "#000" : "#ffffff"
              },
              datetimeFormatter: {
                year: "yyyy",
                month: "MMM 'yy",
                day: "dd MMM",
                hour: "HH:mm"
              }
            },
            axisTicks: {
              color: app.$store.state.isLight ? "#000" : "#ffffff"
            },
            axisBorder: {
              color: app.$store.state.isLight ? "#000" : "#ffffff"
            },
            lines: {
              show: true,
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: app.$store.state.isLight ? "#000" : "#ffffff"
              }
            },
            title: {
              style: {
                color: app.$store.state.isLight ? "#000" : "#ffffff",
                fontSize: 14,
                fontWeight: 600
              }
            },
            axisTicks: {
              show: false,
              color: app.$store.state.isLight ? "#000" : "#ffffff",
              width: 0
            },
            axisBorder: {
              color: app.$store.state.isLight ? "#000" : "#ffffff"
            }
          },
        },
        stroke: {
          width: 4,
          colors:['#ff3064'],
          curve: 'smooth',
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 6,
          colors: ['#ff3064'],
          strokeColors: '#fff',
          strokeWidth: 1,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: ['#ff3064'],
          theme: false,
          style: {
            fontSize: '12px',
            fontFamily: undefined,
            background: "#ff3064"
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: () => '',
            },
          },
          z: {
            formatter: undefined
          },
          marker: {
            show: true,
          },
          items: {
            display: 'flex',
          },
          fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
          },
        },
        title: {
          align: "left"
        },
        fill: {
          opacity:1,
        },

        grid: {
          borderColor: '#eee',
          strokeDashArray: 1,
        }
      },
      data: [],
      allUnits: [],
      menu: false,
      dolar: 1,
      itemPerPage: 100,
      avaibleBalance: 0,
      balance: 0,
      balanceNow: 0,
      orderHeaders: [
        {
          text: "EMİRLERİM",
          sortable: false,
          value: "CoinOrCurrency",
          width: "140px",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "MİKTAR",
          value: "Parameter",
          sortable: false,
          width: "40px",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "TİP",
          value: "buyOrSell",
          sortable: false,
          width: "120px",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "",
          value: "buyOrSell",
          sortable: false,
          width: "80px",
          class: this.$store.state.isLight
              ? "pinkk body-2"
              : "amber--text accent-3 body-2",
        },
        {
          text: "DURUM",
          value: "Closed",
          sortable: false,
          width: "50px",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "TARİH/SAAT",
          value: "createdAt",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
          align: "end"
        }
      ],
      headers: [
        {
          text: "CÜZDANIM",
          align: "start",
          sortable: false,
          value: "shortName",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "FİYAT",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "MİKTAR",
          value: "amount",
          sortable: true,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "KAR/ZARAR",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "TOPLAM",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        }
      ],
      walletLoaded: false,
      orders: [],
      topUserHeaders:[
        {
          text: "EN İYİ OYUNCULAR",
          align: "start",
          sortable: false,
          value: "fullName",
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "BAKİYE",
          value: "balanceNow",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        },
        {
          text: "PORTFÖY",
          value: "graph",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk body-2"
            : "amber--text accent-3 body-2",
        }
      ],
      topUsers: [],
      allPrices: [],
      shortNames: shortNames,
      allImages: allImages
    };
  },
  created() {
    let app = this;
    axios.get("https://finans.truncgil.com/today.json").then(response => {
      app.dolar = parseFloat(response.data["USD"]["Satış"]);
    });
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("allprices", fetchedData => {
      localStorage.setItem("allprices", JSON.stringify(fetchedData));
      app.allPrices = fetchedData;
    });

    if (localStorage.getItem("user")) {
      this.getUserWallet();
      this.getUserAllOrders();
    }
    axios
        .post(`${this.$store.state.api}/getuserbalancelist`, {
          id: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          app.chartOptions.chart.xaxis.categories = Object.keys(response.data)

          app.userBalanceList = [
            {
              data: Object.values(response.data)
            }
          ];
        })
        .catch(err => {
          console.log(err);
        });

    axios
        .get(`${this.$store.state.api}/gettopusers`)
        .then(response => {

          for (let i = 0; i < response.data.length; i++) {
            response.data[i].graph = null;
            response.data[i].graph = setGraph(response.data[i]["wallet"],JSON.parse(localStorage.getItem("allprices")));
          }

          app.topUsers =  response.data;
        });
  },
  methods: {
    getUserWallet: function() {
      this.walletLoaded = false;
      this.balance = 0;
      axios
          .post(`${this.$store.state.api}/getuserwallet`, {
            id: JSON.parse(localStorage.getItem("user")).id
          })
          .then(response => {
            let allPrices = JSON.parse(localStorage.getItem("allprices"));
            let data = Object.values(response.data);
            let temp = [];
            for (let i = 0; i < data.length; i++) {
              if(data[i].amount>0){
                temp.push(data[i]);
              }
            }
            this.data = temp;
            this.balanceNow = this.calculateBalance(JSON.parse(localStorage.getItem("wallet")),JSON.parse(localStorage.getItem("allprices")));
            Object(allPrices);
          })
          .catch(err => {
            console.log(err);
          });
    },
    calculateBalance(wallet,allPrices){
      let balance = 0;
      for (const key in wallet) {
        if(wallet[key]["amount"]>0){
          balance += (wallet[key]["amount"]*allPrices[wallet[key]["shortName"]]) || 0;
        }
      }
      return balance;
    },
    getUserAllOrders: function() {
      this.walletLoaded = false;
      axios
          .post(`${this.$store.state.api}/getallorder`, {
            userId: JSON.parse(localStorage.getItem("user")).id
          })
          .then(response => {
            console.log(response.data)
            this.orders = response.data;
          })
          .catch(err => {
            console.log(err);
          });
    },
    deleteOrder(orderId){
      this.$toasted.show(
          `Emir iptal edildi.`,
          options
      );
      this.getUserAllOrders();
      axios
          .post(`${this.$store.state.api}/deleteorder`, {
            orderId: orderId
          })
          .then(response => {
            console.log(response.data);
            alert("kllklkkl")

          })
          .catch(err => {
            console.log(err);
          });
    },
    buySellNow(orderId,buyOrSell,coinOrCurrency,amount) {
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      this.$toasted.show(buyOrSell == 'buy' ? `Alım emriniz alındı.` : `Satım emriniz alındı.`, options);
      axios
          .post(`${this.$store.state.api}/buysellnow`, {
            orderId: orderId,
            buyOrSell: buyOrSell,
            userId: JSON.parse(localStorage.getItem("user")).id,
            coinOrCurrency: coinOrCurrency,
            amount: amount
          })
          .then(() => {
            this.emirLoaded = true;
            this.getUserWallet();
          })
          .catch(err => {
            console.log(err);
          });
    },
    setChart(){
      let time = (this.select.time);
      axios
          .post(`${this.$store.state.api}/getuserbalancelist`, {
            id: JSON.parse(localStorage.getItem("user")).id
          })
          .then(response => {
            this.chartOptions.chart.xaxis.categories = Object.keys(response.data).slice(-1*time)

            this.userBalanceList = [
              {
                data: Object.values(response.data).slice(-1*time)
              }
            ];
          })
          .catch(err => {
            console.log(err);
          });
    }
  },
  computed: mapState({
    userwalletdialog: state => state.userwalletdialog
  })
};
</script>

<style scoped>
.apexcharts-tooltip {
  background: #ff3366;
  color: #fff;
}
.apexcharts-tooltip-series-group.apexcharts-active{
  background-color: #ff3366 !important;
}
</style>

<style>
.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
  background-attachment: fixed;
}
.theme--dark.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}
.theme--dark.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper),
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}

.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #444767 !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0 10px !important;
}
.v-dialog {
  border-radius: 0 !important;
}
.theme--light.v-btn.v-btn--disabled .v-icon,
.theme--light.v-btn.v-btn--disabled .v-btn__loading {
  color: rgba(255, 255, 255, 0.5) !important;
}
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #444767 !important;
}
</style>
<style scoped>
.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}
h3 {
  cursor: pointer;
}
.v-data-table__wrapper thead {
  border-bottom: 1px solid #5e6593 !important;
}
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:not(:last-child)
> th:not(.v-data-table__mobile-row) {
  border-bottom-color: #ddd !important;
}
.pinkk {
  color: #ff3366 !important;
}
.theme--light.v-data-table {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot{
  background: transparent !important;
  color: #fff !important;
}
</style>