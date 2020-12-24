<template>
  <v-container class="mt-8 pa-0">
    <v-row>

      <v-col md7 sm12 xs12>
        <v-row class="flex-row justify-space-between pl-4 pr-4">
          <div class="white--text font-weight-light">
            <v-avatar size="32" class="mb-2">
              <img
                  :src="'http://'+$store.state.addr+':'+$store.state.port+'/gold.png'"
                  alt="$route.params.gold"
              >
            </v-avatar>
            {{ $route.params.gold }}
          </div>
          <div class="white--text font-weight-light mt-2" :class="[state > 0 ? 'price-up' : 'price-down']">
            {{ satis || "--.----"}} $
          </div>
          <div class="mt-2 white--text" :class="[1>=0 ? 'green--text' : 'red--text']">
            {{ price_change_24h | signint  }}
            <v-icon color="red" v-if="price_change_24h < 0">mdi-trending-down</v-icon>
            <v-icon color="green" v-else-if="price_change_24h > 0">mdi-trending-up</v-icon>
            <v-icon color="gray" v-else-if="price_change_24h == 0">mdi-trending-neutral</v-icon>
          </div>
        </v-row>
      </v-col>
      <v-col md5 sm12 xs12 class="justify-end align-content-end">
        <v-row>
          <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
          <v-btn-toggle
              v-model="time"
              style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;background:transparent;"
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

      </v-col>

    </v-row>

    <div id="chart">
      <apexchart ref="realtimeChart" class="ma-0 pa-0" type="area" height="350" :options="chartOptions"
                 :series="series"></apexchart>
    </div>

    <v-overlay
        :opacity="1"
        :value="overlay"
        color="rgb(29, 36, 96)"
    >
      <v-progress-circular indeterminate size="64">
      </v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios';
import io from "socket.io-client";
//import dump from '../assets/dump.js'

export default {
  name: "SinglePageGraphGold",
  data: (app)=>({
    interval: 0,
    time: 1,
    state:0,
    high: '',
    low: '',
    overlay: false,
    current_price: '',
    last_updated: '',
    alis: '',
    satis: '',
    price_change_24h: '',
    series: [{
      name: app.$route.params.gold,
      data: []
    }],
    chartOptions: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: false,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
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
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
          }
        },
        title: {
          text: 'Fiyat(TL)',
          style: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 600
          }
        },
        axisTicks: {
          show:false,
          color: '#ffffff',
          width:0,
        },
        axisBorder: {
          color: '#ffffff'
        }
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
        labels: {

          style: {
            colors: "#fff",
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm'
          }
        },
        axisTicks: {
          color: '#ffffff'
        },
        axisBorder: {
          color: '#ffffff'
        }
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return val + " $"
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
    this.interval = setInterval(() =>{
      axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/gold/${this.$route.params.gold}`)
          .then(response=>{
            this.alis = response.data["Alış"];
            this.satis = response.data["Satış"];
            this.price_change_24h = response.data["price_change_24h"];
          })
    },1000);

    let temp;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on(app.$route.params.coin, fetchedData => {
      if (fetchedData[fetchedData.length - 1]["Satis"] != temp || !temp) {

        //app.graphData = fetchedData
        //let tempDates = [];
        let time;
        let tempValues = [];
        for (let i = 0; i < fetchedData.length; i++) {
          time = new Date(fetchedData[i]["createdAt"]).getTime();;
          //tempDates.push(time.toLocaleString('tr'));
          tempValues.push([time,fetchedData[i]["Satis"]]);
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
      axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/getgoldaccordingtotimerange`, {
        goldName: this.$route.params.gold,
        time: this.time,
      })
          .then(response => {
            let fetchedData = response.data;
            //let tempDates = [];
            let time;
            let tempValues = [];
            for (let i = 0; i < fetchedData.length; i++) {
              time = new Date(fetchedData[i]["createdAt"]).getTime();
              //tempDates.push(time.toLocaleString('tr'));
              tempValues.push([time,fetchedData[i]["Satis"]])
            }
            this.series = [{
              data: tempValues
            }]
            this.overlay = false;
          })
    }
  },
  watch: {
    time(newVal, oldVal) {
      this.overlay = true;
      console.log(newVal, oldVal);
      this.getGraphData();
    },
    current_price(newValue, oldValue) {
      if (+newValue < +oldValue) {
        this.state = -1;
      } else {
        this.state = 1;
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
</style>