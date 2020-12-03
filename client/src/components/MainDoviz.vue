<template>
  <v-data-table
      :headers="headers"
      :items="data"
      item-class="d-none"
      hide-default-footer
      :loading="!goldloaded"
      disable-pagination
      style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
      class="mt-6"
  >
    <template v-slot:item.type="{ item }">
      <router-link :to="{ name: 'Golds', params: { gold: item.type }}" tag="h4" class="white--text body-1">{{ item.type }}</router-link>
    </template>
  </v-data-table>
</template>


<script>
//import axios from "axios";
import io from "socket.io-client";

export default {
  data () {
    return {
      goldloaded: true,
      headers: [
        { text: 'Altın Kurları',align: 'start', sortable: false,value: 'type',class: 'yellow--text darken-1 font-weight-light body-1',},
        { text: 'Alış', value: 'Alış',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Satış', value: 'Satış',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Yüzde', value: 'Yüzde',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Fark', value: 'Fark',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
        { text: 'Saat', value: 'Saat',sortable: false,align: 'start',class: 'yellow--text darken-1 font-weight-light body-1', },
      ],
      data: []
    }
  },
  created() {
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("currencies", fetchedData => {
      app.data = fetchedData
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
    getColor (price) {
      if (price > 400) return 'red'
      else if (price > 200) return 'orange'
      else return 'green'
    },
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
