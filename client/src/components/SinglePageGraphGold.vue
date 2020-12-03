<template>
  <v-container class="ma-0 mt-6 pa-0">
    <v-row>
      <h2 class="white--text font-weight-light ml-10">
        <v-avatar size="32" class="mb-2">
          <img
              src="http://localhost:4000/gold.png"
              alt="$route.params.gold"
          >
        </v-avatar>
        {{$route.params.gold}}
      </h2>
      <h2 class="white--text font-weight-light ml-10" :class="[state > 0 ? 'price-up' : 'price-down']">
        {{ alis || "--.---" }}
        <span v-if="$route.params.gold.indexOf('Ons') == 0">$</span>
        <span v-else>₺</span>
      </h2>
      <!--<h3 class="ml-4 mt-2 white&#45;&#45;text" :class="[price_change_24h>=0 ? 'green&#45;&#45;text' : 'red&#45;&#45;text']">
        {{price_change_24h}}
        <v-icon color="red" v-if="price_change_24h < 0">mdi-trending-down</v-icon>
        <v-icon color="green" v-else-if="price_change_24h > 0">mdi-trending-up</v-icon>
        <v-icon color="gray" v-else-if="price_change_24h == 0">mdi-trending-neutral</v-icon>
      </h3>-->
    </v-row>

    <div id="chart">
      <apexchart class="ma-0 pa-0" type="area" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
//import dump from '../assets/dump.js'

export default {
  name: "SinglePageGraph",
  data: (app)=>({
    state:0,
    high: '',
    low: '',
    current_price: '',
    last_updated: '',
    alis: '',
    satis: '',
    series: [{
      name: app.$route.params.gold,
      data: [30, 40, 45,30, 40, 45,30, 40, 45,30, 40, 45,30, 40, 45]
    }],
    chartOptions: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      stroke:{
        width:1
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
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
          style: {
            colors: "#fff",
          }
        },
        title: {
          text: 'Fiyat',
          style: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 600
          }
        },
        axisTicks: {
          color: '#ffffff'
        },
        axisBorder: {
          color: '#ffffff'
        }
      },
      xaxis: {
        //type: 'datetime',
        labels: {
          style: {
            colors: "#fff",
          }
        },
        categories: ['a','b','c'],
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
          formatter: function (val) {
            return (val / 1000000).toFixed(2)
          }
        }
      }
    },
  }),
  created() {
    setInterval(() =>{
      axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/gold/${this.$route.params.gold}`)
          .then(response=>{
            this.alis = response.data["Alış"];
            this.satis = response.data["Satış"];
          })
    },1000)
  },
  watch: {

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