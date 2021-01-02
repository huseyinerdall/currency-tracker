<template>
  <div>
    <v-list style="border: 1px solid #5e6593;" class="mt-1 pt-0" dense
    :dark="!$store.state.isLight">
      <v-subheader style="border-bottom: 1px solid #5e6593;" class="mobile-tr" :style="$route.path != '/capraz-kurlar' ? 'height:56px !important;' : ''">
        <v-row class="justify-space-between pl-2 pr-2">
          <h3 class="amber--text">1000 TL NE OLDU?</h3>
          <div class="d-flex flex-row">
            <v-btn x-small color="#71402c" style="border-radius: 0;" @click="time = 2">Dün</v-btn>
            <v-btn x-small color="#720e60" style="border-radius: 0;" @click="time = 7">Geçen Hafta</v-btn>
            <v-btn x-small color="#0b4e82" style="border-radius: 0;" @click="time = 30">Geçen Ay</v-btn>
            <v-btn x-small color="#0b4e82" style="border-radius: 0;" @click="time = 360">Geçen Yıl</v-btn>
          </div>
        </v-row>
      </v-subheader>
      <v-list-item v-for="value in data" :key="value.type">
        <v-list-item-content>

          <v-row>
            <v-col cols="2" class="">
              <div :class="$store.state.isLight ? 'black--text' : 'white--text'" style="font-size:14px;margin-top:-2px;">{{ bintltable[value.type] }}</div>
            </v-col>
            <v-col cols="10" style="height: 10px;" class="pt-2">

              <v-progress-linear
                  v-if="value.value>0"
                  color="yellow darken-1"
                  height="16"
                  :value="(1000+value.value)/20"
              >
                <template v-slot:default="{}">
                  <strong>{{1000+value.value | tofixedfour}} TL</strong>
                </template>
              </v-progress-linear>
              <v-progress-linear
                  v-else
                  color="error"
                  height="16"
                  :value="(1000+value.value)/20"
              >
                <template v-slot:default="{}">
                  <strong>{{ (1000+value.value) | tofixedfour}} TL</strong>
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
      "BTC":"BTC",
      "JAPONYENI":"JPY"
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
</style>