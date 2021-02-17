<template>
  <div>
    <v-list style="border: 1px solid #ddd;" class="mt-1 pt-0" dense
    :dark="!$store.state.isLight">
      <v-subheader style="border-bottom: 1px solid #ddd;" class="mobile-tr" :style="$route.path != '/capraz-kurlar' ? 'height:56px !important;' : ''">
        <v-row class="justify-space-between pl-2 pr-2">
          <h3 :class="$store.state.isLight ? 'pinkk' : 'amber--text'">1000 TL NE OLDU?</h3>
          <div class="d-flex flex-row">
            <v-btn v-if="new Date().getDay() != 0 && new Date().getDay() != 1" x-small color="#71402c" style="border-radius: 0;" @click="time = 2">Dün</v-btn>
            <v-btn x-small color="#720e60" style="border-radius: 0;" @click="time = 7">Geçen Hafta</v-btn>
            <v-btn x-small color="#0b4e82" style="border-radius: 0;" @click="time = 30">Geçen Ay</v-btn>
            <v-btn x-small color="#0b4e82" style="border-radius: 0;" @click="time = 360">Geçen Yıl</v-btn>
          </div>
        </v-row>
      </v-subheader>
      <v-list-item v-for="value in data" :key="value.type" style="padding: 0 0 0 10px !important;">
        <v-list-item-content>

          <v-row>
            <v-col cols="2" class="">
              <div :class="$store.state.isLight ? 'black--text' : 'white--text'" style="font-size:14px;margin-top:-2px;">{{ bintltable[value.type] }}</div>
            </v-col>
            <v-col cols="10" style="height: 10px;" class="pt-2">

              <v-progress-linear
                  v-if="value.value>0"
                  color="rgb(2, 192, 118)"
                  height="16"
                  :value="(1000+value.value)/20"
              >
                <template v-slot:default="{}">
                  <strong style="font-size: 11px;">{{(1000+value.value) | tofixedfour}} TL</strong>
                </template>
              </v-progress-linear>
              <v-progress-linear
                  v-else
                  color="rgb(248, 73, 96)"
                  height="16"
                  :value="(1000+value.value)/20"
              >
                <template v-slot:default="{}">
                  <strong style="font-size: 11px;">{{ (1000+value.value) | tofixedfour}} TL</strong>
                </template>
              </v-progress-linear>
            </v-col>
          </v-row>
        </v-list-item-content>

        <v-list-item-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
//import io from "socket.io-client";
import axios from 'axios';
export default {
  name: "BinTLTable",
  data: () => ({
    time: 2,
    data :[],
    bintltable: {
      "ABDDOLARI":"USD",
      "EURO":"EUR",
      "INGILIZSTERLINI":"GBP",
      "KANADADOLARI":"CAD",
      "SUUDIARABISTANRIYALI":"SAR",
      "JAPONYENI":"JPY",
      "GoldOnsAltin":"ONS",
      "GoldGramAltin":"G.ALTIN",
      "GoldGumus":"GÜMÜŞ",
      "BTC":"BTC",
      "ETH":"ETH",
      "XRP":"XRP",
      "DOGE":"DOGE",
      "USDT":"USDT"
    }
  }),
  created() {
    //let app = this;
    /*var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("bintl", fetchedData => {
      app.data = fetchedData
    })*/
    this.getData();
  },
  methods: {
    getData() {
      axios.post(`${this.$store.state.api}/bintltable`, {
        time: this.time,
      })
          .then(response => {
            //let fetchedData = response.data;
            this.data = response.data;
          })
    }
  },
  watch: {
    time(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.getData();
    },
  }
};
</script>


<style scoped>
.theme--dark.v-list{
  background-color: rgba(0,0,0,0.3) !important;
}
.theme--light.v-btn{
  color: #fff !important;
}
.v-list-item__content{
  padding: 0 !important;
}
.mobile-tr{
  height: 32px;
}
@media screen and (max-width:768px){
  .mobile-tr{
    height: 56px;
  }
}
.pinkk{
  color:#ff3366 !important;
}
</style>