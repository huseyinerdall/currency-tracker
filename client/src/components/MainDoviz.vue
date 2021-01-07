<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :loading="!goldloaded"
        disable-pagination
        style="border: 1px solid #ddd;border-radius:0;"
        :style="[ $store.state.isLight ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);' : 'color:#ffffff;background-color:rgba(0,0,0,.3);']"
        mobile-breakpoint="0"
        class="mt-1"
        dense
        :dark="!$store.state.isLight"
        :light="$store.state.isLight"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;border-color:#ddd !important;' : 'color:#ffffff !important;']">
            <router-link :to="{ name: 'Currencies', params: { gold: item.type }}" tag="span" class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`">
              {{ item.type == "SUUDİ ARABİSTAN RİYALİ" ? 'S.A. RİYALİ' : item.type }}
            </router-link>
          </td>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">{{item["Alış"]}}</td>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">{{item["Satış"]}}</td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span :class="[(item['Satış'] - item.close)>=0 ? 'green--text' : 'red--text']" class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">
              {{ parseFloat(item["Satış"]) - parseFloat(item.close) | signint }}
            </span>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span :class="[((item['Satış'] - item.close)/item.close)>=0 ? 'green--text' : 'red--text']" class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">
              {{ ((parseFloat(item["Satış"]) - parseFloat(item.close))/parseFloat(item.close))*100 | signint }}%
            </span>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown" :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
            <span class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.time | onlyTime }}</span>
          </td>
        </tr>
      </template>

    </v-data-table>
    <v-overlay
        :opacity="1"
        :value="overlay"
        :color="$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'"
    >
      <v-progress-circular indeterminate size="64" :color="!$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'">
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
        { text: 'Döviz Kurları',align: 'start', sortable: false,value: 'type',class: 'amber--text accent-3 body-1',width:"160px"},
        { text: 'Alış', value: 'Alış',sortable: false,align: 'start',class: 'amber--text accent-3 body-1', },
        { text: 'Satış', value: 'Satış',sortable: false,align: 'start',class: 'amber--text accent-3 body-1', },
        { text: 'Yüzde', value: 'Yuzde',sortable: false,align: 'start',class: 'amber--text accent-3 body-1', },
        { text: 'Fark', value: 'Fark',sortable: false,align: 'start',class: 'amber--text accent-3 body-1', },
        { text: 'Saat', value: 'time',sortable: false,align: 'start',class: 'amber--text accent-3 body-1', },
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
    socket.on("currencies", fetchedData => {
      app.data = fetchedData;
      let temp = app.data[3];
      app.data[3] = app.data[1];
      app.data[1] = temp;
      temp = app.data[3];
      app.data[3] = app.data[2];
      app.data[2] = temp;
      temp = app.data[2];
      app.data[2] = app.data[19];
      app.data[19] = temp;

      if(app.$route.path == '/'){
        app.data.pop();
        app.data.pop();
        app.data.pop();
        app.data.pop();
      }
      app.overlay = false;
    })

  },
  methods: {
  },
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: rgba(0, 0, 0, .3) !important;
}
h3{
  cursor: pointer;
}
.v-data-table__wrapper thead{
  border-bottom: 1px solid #5e6593 !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
  border-bottom-color: #ddd !important;
}
</style>
<style>
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th{
  border-bottom-color: #ddd !important;
}

</style>
