<template>
  <div>
    <v-chip
        class="ma-0 amber accent-3"
        label
    >
      1000 TL ne oldu?
    </v-chip>
    <v-list style="border: 1px solid #5e6593;" class="mt-1" dense>
      <v-subheader style="border-bottom: 1px solid #5e6593;">
        <v-row class="justify-space-around">
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
            <v-col cols="2">
              <span class="white--text">{{ bintltable[value.type] }}</span>
            </v-col>
            <v-col cols="10">

              <v-progress-linear
                  v-if="value.value>0"
                  color="yellow darken-1"
                  height="20"
                  :value="value.value/2"
              >
                <template v-slot:default="{}">
                  <strong>{{value.value | tofixedfour}} TL</strong>
                </template>
              </v-progress-linear>
              <v-progress-linear
                  v-else
                  color="error"
                  height="20"
                  :value="-value.value/2"
              >
                <template v-slot:default="{}">
                  <strong>{{ (value.value) | tofixedfour}} TL</strong>
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
    /*var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("bintl", fetchedData => {
      app.data = fetchedData
    })*/
    this.getData();
  },
  methods: {
    getData() {
      axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/bintltable`, {
        time: this.time,
      })
          .then(response => {
            let fetchedData = response.data;
            console.log(fetchedData)
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
.v-list.v-sheet.theme--light{
  background-color: rgba(0,0,0,.3) !important;
}
.theme--light.v-btn{
  color: #fff !important;
}
.v-list-item__content{
  padding: 0 !important;
}
</style>