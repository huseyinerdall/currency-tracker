<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        disable-pagination
    >
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "TCMBCurrencyTable",
  data: () => ({
    headers: [
      { text: 'Döviz Adı',align: 'start', sortable: false,value: 'name',},
      { text: 'Satış Fiyatı', value: 'buy',sortable: false,align: 'right', },
      { text: 'Alış Fiyatı', value: 'sell',sortable: false,align: 'right', },
    ],
    data:[]
  }),
  created(){
    let app = this;
    var socket = io.connect(`http://${this.$store.state.addr}:${this.$store.state.port}`);
    axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/tcmb`);

    socket.on("tcmb", fetchedData => {
      app.data = fetchedData
    })
  }
};
</script>
