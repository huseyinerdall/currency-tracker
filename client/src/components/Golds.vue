<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :loading="!goldloaded"
        disable-pagination
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        mobile-breakpoint="0"
        class="mt-1"
        dense
    >
      <template v-slot:item.type="{ item }">
        <router-link :to="{ name: 'Golds', params: { gold: item.type }}" tag="span" class="white--text body-1 text-uppercase" style="font-size:12px !important;cursor:pointer;">{{ item.type | shorten }}</router-link>
      </template>
      <template v-slot:item.Fark="{ item }">
        <span :class="[(parseFloat(item['Satış']) - parseFloat(item.close))>=0 ? 'green--text' : 'red--text']">
          {{ parseFloat(item["Satış"]) - parseFloat(item.close) | signint }}
        </span>
      </template>
      <template v-slot:item.Yuzde="{ item }">
        <span :class="[((parseFloat(item['Satış']) - parseFloat(item.close))/parseFloat(item.close))>=0 ? 'green--text' : 'red--text']">
          {{ ((parseFloat(item["Satış"]) - parseFloat(item.close))/parseFloat(item.close)) | signint }}%
        </span>
      </template>
      <template v-slot:item.time="{ item }">
        <span>{{ item.time | onlyTime }}</span>
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
import io from "socket.io-client";

export default {
  data () {
    return {
      goldloaded: true,
      headers: [
        { text: 'Altın Kurları',align: 'start', sortable: false,value: 'type',class: 'amber--text accent-3 font-weight-light body-1',},
        { text: 'Alış', value: 'Alış',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
        { text: 'Satış', value: 'Satış',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
        { text: 'Yüzde', value: 'Yuzde',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
        { text: 'Fark', value: 'Fark',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
        { text: 'Saat', value: 'time',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
      ],
      data: [],
      overlay: true,
    }
  },
  created() {
    if(this.$vuetify.breakpoint.smAndDown){
      this.headers.pop();
      this.headers.pop();
      this.headers.pop();
    }
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("golds", fetchedData => {
      app.data = fetchedData;
      app.overlay = false;
    })
    /*this.interval = setInterval(() => {
      let app = this;
      axios.get("http://localhost:4000/golds")
          .then((res)=>{
            app.data = res.data;
            app.goldloaded = true;
          })
    },1000)*/
  },
  methods: {
  },
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: #ff0000 !important;
}
td{
  color:white !important;
}
h3{
  cursor: pointer;
}
.v-data-table__wrapper thead{
  border-bottom: 1px solid #5e6593 !important;
}
.v-data-table__wrapper tr{
  color: white !important;
}
</style>
