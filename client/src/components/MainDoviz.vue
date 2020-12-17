<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :loading="!goldloaded"
        disable-pagination
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        height="817"
        mobile-breakpoint="0"
        class="mt-4"
    >
      <template v-slot:item.type="{ item }">
        <router-link :to="{ name: 'Golds', params: { gold: item.type }}" tag="span" class="white--text body-1" style="font-size:12px !important;">{{ item.type }}</router-link>
      </template>
      <template v-slot:item.Fark="{ item }">
        <span :class="[(item['Satış'] - item.close)>=0 ? 'green--text' : 'red--text']">
          {{ item["Satış"] - item.close | signint }}
        </span>
      </template>
      <template v-slot:item.Yuzde="{ item }">
        <span :class="[((item['Satış'] - item.close)/item.close)>=0 ? 'green--text' : 'red--text']">
          {{ ((item["Satış"] - item.close)/item.close) | signint }}%
        </span>
      </template>
      <template v-slot:item.time="{ item }">
        <span>{{ item.time | onlyTime }}</span>
      </template>
    </v-data-table>

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
        { text: 'Döviz Kurları',align: 'start', sortable: false,value: 'type',class: 'yellow--text darken-1 font-weight-light body-1',},
        { text: 'Alış', value: 'Alış',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Satış', value: 'Satış',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Yüzde', value: 'Yuzde',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Fark', value: 'Fark',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Saat', value: 'time',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
      ],
      data: []
    }
  },
  created() {
    if(this.$vuetify.breakpoint.smAndDown){
      this.headers.pop();
      this.headers.pop();
      this.headers.pop();
    }
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("currencies", fetchedData => {
      app.data = fetchedData;
      console.log(fetchedData)
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
