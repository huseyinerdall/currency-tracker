<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :loading="!goldloaded"
        disable-pagination
        style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;"
        mobile-breakpoint="0"
        class="mt-4"
        dense
    >
      <template v-slot:item.rate="{ item }">
        <span :class="[(item.rate)>=0 ? 'green--text' : 'red--text']">
          {{ item.rate | signint }}%
        </span>
      </template>
      <template v-slot:item.time="{ item }">
        <span>{{ item.time | onlyTime }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "EmtiaTable",
  data: () => ({
    goldloaded: true,
    headers: [
      { text: 'Emtia',align: 'start', sortable: false,value: 'text',class: 'amber--text accent-3 font-weight-light body-1',},
      { text: 'Alış', value: 'buying',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
      { text: 'Satış', value: 'selling',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
      { text: 'Yüzde', value: 'rate',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
      //{ text: 'Fark', value: 'Fark',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
      { text: 'Saat', value: 'time',sortable: false,align: 'start',class: 'amber--text accent-3 font-weight-light body-1', },
    ],
    data: []
  }),
  created () {
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("emtia", fetchedData => {
      app.data = fetchedData;
      console.log(fetchedData)
    })
  },
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
