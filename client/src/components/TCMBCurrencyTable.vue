<template>
  <div>
    <v-chip
        class="ma-0 amber accent-3"
        label
    >
      Merkez Bankası Verileri
    </v-chip>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        disable-pagination
        dense
        class="mt-1"
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        mobile-breakpoint=false
    >
      <template v-slot:item.name="{ item }">
        <span>{{item.name | shorten }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "TCMBCurrencyTable",
  data: () => ({
    headers: [
      { text: 'Döviz Adı',align: 'start', sortable: false,value: 'name',class: 'amber--text accent-3 font-weight-light body-1',},
      { text: 'Alış', value: 'buy',sortable: false,align: 'right', class: 'amber--text accent-3 font-weight-light body-1',},
      { text: 'Satış', value: 'sell',sortable: false,align: 'right',class: 'amber--text accent-3 font-weight-light body-1', },
    ],
    data:[]
  }),
  created(){
    axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/tcmb`);
    let app = this;
    var socket = io.connect(`http://${this.$store.state.addr}:${this.$store.state.port}`);


    socket.on("tcmb", fetchedData => {
      app.data = fetchedData
    })
  }
};
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