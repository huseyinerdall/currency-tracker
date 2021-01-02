<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :loading="!goldloaded"
        disable-pagination
        style="border: 1px solid #444767;border-radius:0;"
        :style="[ $store.state.isLight ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3) !important;' : 'color:#ffffff;background-color:rgba(0,0,0,.3) !important;']"
        mobile-breakpoint="0"
        class="mt-1"
        dense
        sort-by="type"
        :dark="!$store.state.isLight"
        :light="$store.state.isLight"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
            <router-link :to="{ name: 'Golds', params: { gold: item.type }}" tag="span" class="body-1 text-uppercase" :style="`font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`">{{ item.type | shorten }}</router-link>
          </td>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
            <span class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.Alış }}</span>
          </td>
          <td :style="[$store.state.isLight ? 'color:rgba(0,0,0,0.87) !important;' : 'color:#ffffff !important;']">
            <span class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">{{ item.Satış }}</span>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span :class="[(parseFloat(item['Satış']) - parseFloat(item.close))>=0 ? 'green--text' : 'red--text']" class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">
              {{ parseFloat(item["Satış"]) - parseFloat(item.close) | signint }}
            </span>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span :class="[((parseFloat(item['Satış']) - parseFloat(item.close))/parseFloat(item.close))>=0 ? 'green--text' : 'red--text']" class="body-1" :style="`font-size: ${$store.state.tdFontSize} !important;`">
              {{ ((parseFloat(item["Satış"]) - parseFloat(item.close))/parseFloat(item.close)) | signint }}%
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
        { text: 'Altın Kurları',align: 'start', sortable: false,value: 'type',class: 'amber--text accent-3 font-weight-light body-1',width:"160px"},
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
  background: rgba(0, 0, 0, .3) !important;
}
h3{
  cursor: pointer;
}
.v-data-table__wrapper thead{
  border-bottom: 1px solid #5e6593 !important;
}
</style>
