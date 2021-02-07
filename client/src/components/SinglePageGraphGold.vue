<template>
  <v-container class="mt-8 pa-0">

    <v-row class="flex-row pl-4 pr-4">
      <div>
        <v-avatar size="56" class="mb-2">
          <img
              :src="flag || $store.state.api+'/gold.png'"
              :alt="gold"
          >
        </v-avatar>
      </div>

      <div class="flex-column d-flex ml-2" style="width: 200px;">
        <div>
          <h3 :style="$store.state.isLight ? 'color:#000;':'color:#fff;'">{{ gold | shorten }} {{ type == 'Altın' ? '' : '-' }} {{ gold | tosymbol }}</h3>
        </div>
        <div class="d-flex flex-row justify-space-between">
          <v-select
              v-if="type!='Altın'"
              hide-details
              :items="['SERBEST PİYASA','MERKEZ BANKASI']"
              label=""
              v-model="secenek"
              value="SERBEST PİYASA"
              dense
              style="width:134px !important;"
              class="light-select"
              :light="$store.state.isLight"
              :dark="!$store.state.isLight"
              :color="$store.state.isLight ? '#fff' : '#000'"

          ></v-select>
          <span style="font-size:12px;padding-top:9px;" :style="$store.state.isLight ? 'color:#000;':'color:#fff;'">{{updatetime | onlyTime}}</span>
        </div>
      </div>
    </v-row>
    <v-row class="pl-4 pr-4">
      <v-row class="pl-4 pr-4 justify-space-between" style="font-size: 18px;">
        <div class="mt-2" :style="$store.state.isLight ? 'color:#000;':'color:#fff;'" :class="[state > 0 ? 'price-up' : 'price-down']">
          {{ (alis || 0) | binayracveondalik }} {{ gold == "Ons Altın" ? '$' : 'TL' }}
        </div>
        <div class="mt-2" :style="$store.state.isLight ? 'color:#000;':'color:#fff;'" :class="[state > 0 ? 'price-up' : 'price-down']">
          {{ (satis || 0) | binayracveondalik }} {{ gold == "Ons Altın" ? '$' : 'TL' }}
        </div>
        <div class="mt-2" :style="$store.state.isLight ? 'color:#000;':'color:#fff;'" :class="[parseFloat(satis) - parseFloat(close)>=0 ? 'green--text' : 'red--text']">
          {{ parseFloat(satis) - parseFloat(close) | signint  }}
          <v-icon color="red" v-if="parseFloat(satis) - parseFloat(close) < 0">mdi-trending-down</v-icon>
          <v-icon color="green" v-else-if="parseFloat(satis) - parseFloat(close) > 0">mdi-trending-up</v-icon>
          <v-icon color="gray" v-else-if="parseFloat(satis) - parseFloat(close) == 0">mdi-trending-neutral</v-icon>
        </div>
        <div class="mt-2" :style="$store.state.isLight ? 'color:#000;':'color:#fff;'" :class="[parseFloat(satis) - parseFloat(close)>=0 ? 'green--text' : 'red--text']">
          {{ ((parseFloat(satis) - parseFloat(close))/parseFloat(close))*100 | signint  }}%
        </div>
      </v-row>
      <v-row class="d-flex flex-row justify-space-between pl-md-4 pr-md-2 mt-2 mt-md-0">
        <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
        <v-btn-toggle
            v-model="time"
            style="border: 1px solid #ddd;border-radius:0;background-color:transparent;color:#000;padding:4px;"
            mandatory
            right
            :class="[$vuetify.breakpoint.smAndDown ? 'mx-auto' : '' ]"
        >
          <v-btn :value="time" style="background: transparent;">
            <v-icon>mdi-share-variant-outline</v-icon>
          </v-btn>
          <v-btn value="1" style="background: transparent;" >24S</v-btn>
          <v-btn value="7" style="background: transparent;" >7G</v-btn>
          <v-btn value="30" style="background: transparent;" >1A</v-btn>
          <v-btn value="90" style="background: transparent;" >3A</v-btn>
          <v-btn value="365" style="background: transparent;" >1Y</v-btn>
          <v-btn value="1095" style="background: transparent;" >3Y</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-row>


    <div id="chart" style="border: 1px solid #ddd;" class="mt-2">
      <apexchart class="ma-0 pa-0" type="area" height="350" :options="chartOptions"
                 :series="series"></apexchart>
    </div>

    <v-overlay
        :opacity="1"
        :value="overlay"
        :color="$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'"
    >
      <v-progress-circular indeterminate size="64" :color="!$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'">
      </v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios';
import io from "socket.io-client";
//import dump from '../assets/dump.js'
import currencies from '../assets/currencies.js';
export default {
  name: "SinglePageGraphGold",
  props: {
    gold: {
      type: String
    },
  },
  data: (app)=>({
    secenek:'SERBEST PİYASA',
    flag: '',
    interval: 0,
    dolar: 0,
    time: 1,
    state:0,
    high: '',
    low: '',
    overlay: true,
    current_price: '',
    last_updated: '',
    alis: '',
    satis: '',
    close: '',
    type: '',
    updatetime: '',
    series: [{
      name: app.gold,
    }],
    chartOptions: {
      chart: {
        type: 'area',
        //stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: false
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
          },
          autoSelected: 'zoom'
        },
        locales: [{
          name: 'en',
          options: {
            months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
            shortMonths: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Agu', 'Eyl', 'Eki', 'Kas', 'Ara'],
            days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
            shortDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
          }
        }],
      },

      stroke: {
        width: 1
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: app.$store.state.isLight ? '#000' : '#fff',
          }
        },
        title: {
          text: 'Fiyat(TL)',
          style: {
            color: app.$store.state.isLight ? '#000' : '#fff',
            fontSize: 14,
            fontWeight: 600
          }
        },
        axisTicks: {
          show:false,
          color: app.$store.state.isLight ? '#000' : '#fff',
          width:0,
        },
        axisBorder: {
          color: app.$store.state.isLight ? '#000' : '#fff',
        }
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        labels: {

          style: {
            colors: app.$store.state.isLight ? '#000' : '#ffffff',
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        },
        axisTicks: {
          color: app.$store.state.isLight ? '#000' : '#ffffff',
        },
        axisBorder: {
          color: app.$store.state.isLight ? '#000' : '#ffffff',
        }
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            let simge = app.gold == "Ons Altın" ? " $" : " TL";
            return val + simge;
          }
        },
        x: {
          format:'dd MMM yyyy HH:mm:ss',
          formatter: function(val) {
            return new Date(val).toLocaleString("tr")
          }
        }
      },

    },
  }),
  created() {
    for (let i = 0; i < currencies.length; i++){
      if(currencies[i]["name"]==this.gold){
        this.flag = currencies[i]["image"];
      }
    }
    if(this.$vuetify.breakpoint.smAndDown){
      this.chartOptions.responsive = [
        {
          breakpoint: 768,
          options: {
            xaxis: {
              axisTicks:{
                show: false,
                color: "#ff0000"
              },
              labels:{
                show: false,
              }
            },
            yaxis: {
              axisTicks: {
                show: false,
              },
              labels:{
                show:false,
              }
            }
          }
        }
      ]
    }
    let app = this;
    axios.get(`${this.$store.state.api}/gold/${this.gold}`)
        .then(response=>{
          this.close = response.data["close"];
        })
    axios.get('https://finans.truncgil.com/today.json')
        .then(async response => {
          let sepetalis = ((parseFloat(response.data["ABD DOLARI"]["Alış"]) + parseFloat(response.data["EURO"]["Alış"])) / 2).toFixed(4);
          let sepetsatis = ((parseFloat(response.data["ABD DOLARI"]["Satış"]) + parseFloat(response.data["EURO"]["Satış"])) / 2).toFixed(4);
          response.data["SEPET KUR"] = {"Alış":sepetalis,"Satış":sepetsatis};
          response.data[this.gold]["time"] = response.data["Güncelleme Tarihi"];
          if (this.gold.indexOf("Altın") > 0 || this.gold == '22 Ayar Bilezik' || this.gold == 'Gümüş') {
            response.data[this.gold]["type"] = this.gold;
          } else if (this.gold.indexOf("Güncelleme") < 0 && this.gold.indexOf("ÇEKME") < 0) {
            response.data[this.gold]["type"] = this.gold;
          }
          this.alis = response.data[this.gold]["Alış"];
          this.satis = response.data[this.gold]["Satış"];
          this.updatetime = response.data[this.gold]["time"];
          this.type = response.data[this.gold]["Tür"]
        })
        .catch(err => console.log(err));

    let temp;
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on(app.gold, fetchedData => {
      if (fetchedData[fetchedData.length - 1]["Satis"] != temp || !temp) {
        let tempValues = [];
        for (let i = 0; i < fetchedData.length; i++) {
          tempValues.push([fetchedData[i]["createdAt"],fetchedData[i]["Satis"]]);
        }
        if(app.time == 1){
          app.series = [{
            data: tempValues
          }]
        }
        temp = fetchedData[fetchedData.length - 1]["Satis"];
      }
    })
    this.getGraphData();
  },
  methods: {
    getGraphData: function() {
      axios.post(`${this.$store.state.api}/getgoldaccordingtotimerange`, {
        goldName: this.gold,
        time: this.time,
      })
          .then(response => {
            let fetchedData = response.data;
            //let tempDates = [];
            let tempValues = [];
            for (let i = 0; i < fetchedData.length; i++) {
              tempValues.push([fetchedData[i]["createdAt"],fetchedData[i]["Satis"]])
            }
            this.series = [{
              data: tempValues
            }]
            this.overlay = false;
          })
    }
  },
  watch: {
    time() {
      //this.overlay = true;
      this.getGraphData();
    },
    current_price(newValue, oldValue) {
      if (+newValue < +oldValue) {
        this.state = -1;
      } else {
        this.state = 1;
      }
    },
    secenek(newVal, oldVal) {
      console.log(newVal, oldVal);
      if(newVal == "MERKEZ BANKASI"){
        clearInterval(this.interval);
        axios.post(`${this.$store.state.api}/tcmbone`, {
          one: this.gold
        })
            .then(response => {
              this.alis = response.data.buy;
              this.satis = response.data.sell;
            })
      }else{
        this.interval = setInterval(() =>{
          axios.get(`${this.$store.state.api}/gold/${this.gold}`)
              .then(response=>{
                this.alis = response.data["Alış"];
                this.satis = response.data["Satış"];
                this.close = response.data["close"];
                this.updatetime = response.data["time"];
                this.type = response.data["Tür"]
              })
        },1000);
      }

    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
@keyframes price-up {
  0%{
    background-color: darkgreen;
  }
  100%{
    background-color: unset;
  }
}
@keyframes price-down {
  0%{
    background-color: red;
  }
  100%{
    background-color: unset;
  }
}
.price-up {
  -webkit-animation: 1.5s alternate price-up;
  animation: 1.5s alternate price-up;
}
.price-down {
  -webkit-animation: 1.5s alternate price-down;
  animation: 1.5s alternate price-down;
}
</style>

<style>
.apexcharts-toolbar {
  z-index: 0 !important;
}
@media screen and (max-width: 768px){
  .apexcharts-yaxis{
    display: none;
  }
}
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn{
  background: rgba(0, 0, 0, 0.1) !important;
}
.v-btn-toggle > .v-btn.v-btn{
  opacity: 1;
  background: rgba(255, 255, 255, 0.9) !important;
}
.v-input{
  flex:none;
}
.light-select .v-select__selection{
  font-size: 11px !important;
}
.light-select.v-text-field.v-input--dense:not(.v-text-field--enclosed):not(.v-text-field--full-width) .v-input__append-inner .v-input__icon > .v-icon{
  margin-top: 0 !important;
}
.light-select .v-text-field.v-input--is-focused > .v-input__control > .v-input__slot:after{
  transform: scaleX(0) !important;
}
</style>