<template>
  <v-container class="mt-8 pa-0">

    <v-row>
      <v-col md7 sm12 xs12>
        <v-row>
          <h2 class="white--text font-weight-light ml-10">
            <v-avatar size="32" class="mb-2">
              <img
                  :src="coinImage"
                  :alt="$route.params.coin"
              >
            </v-avatar>
            {{ $route.params.coin }}
          </h2>
          <h2 class="white--text font-weight-light ml-10" :class="[state > 0 ? 'price-up' : 'price-down']">
            {{ current_price || "--.----"}} $
          </h2>
          <h3 class="ml-4 mt-2 white--text" :class="[price_change_24h>=0 ? 'green--text' : 'red--text']">
            {{ price_change_24h }}
            <v-icon color="red" v-if="price_change_24h < 0">mdi-trending-down</v-icon>
            <v-icon color="green" v-else-if="price_change_24h > 0">mdi-trending-up</v-icon>
            <v-icon color="gray" v-else-if="price_change_24h == 0">mdi-trending-neutral</v-icon>
          </h3>
        </v-row>
      </v-col>
      <v-col md5 sm12 xs12 class="justify-end align-content-end">
        <v-row>
          <!--
          <v-chip
              class="ma-2"
              color="orange"
              text-color="white"
              link
              outlined
              label
              @click.stop="openComments"

          >
            Yorumlar
            <v-icon right>
              mdi-comment
            </v-icon>
          </v-chip>
          -->
          <v-btn-toggle
              v-model="time"
              style="border: 1px solid #444767;border-radius:0;background-color:rgba(0,0,0,.3);color:#fff;background:transparent;"
              class="mx-auto"
              mandatory
              right
          >

            <v-btn value="1" style="background: transparent;" @click.stop="openComments">
              <v-icon>
                mdi-comment
              </v-icon>
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
        color="indigo"
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
        name: "SinglePageGraph",
        data: (app) => ({
            timeRange: 1,
            time: 1,
            overlay: false,
            state: 0,
            coinImage: '',
            high: '',
            low: '',
            current_price: '',
            last_updated: '',
            price_change_24h: '',
            price_change_percentage_24h: '',
            series: [{
                name: app.$route.params.coin,
                data: []
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
                        text: 'Fiyat($)',
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
                    tickAmount: 6,
                    labels: {
                        style: {
                            colors: "#fff",
                        }
                    },
                    categories: ['-', '-', '-'],
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
                }
            },
        }),
        methods: {
            openComments: function() {
                this.$store.commit('commentDrawer');

            },
            sleep: function(ms) {
                return new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });
            },
            getGraphData: function() {
                axios.post(`http://${this.$store.state.addr}:${this.$store.state.port}/getcoinaccordingtotimerange`, {
                        coinName: this.$route.params.coin,
                        time: this.time,
                    })
                    .then(response => {
                        let fetchedData = response.data;
                        let tempDates = [];
                        let time;
                        let tempValues = [];
                        for (let i = 0; i < fetchedData.length; i++) {
                            time = new Date(fetchedData[i]["createdAt"]);
                            tempDates.push(time.toLocaleString('tr'));
                            tempValues.push(fetchedData[i]["Fiyat"])
                        }
                        this.series = [{
                            data: tempValues
                        }]
                        this.chartOptions = {
                            xaxis: {
                                categories: tempDates
                            }
                        }
                    })
            }
        },
        created() {
            console.log(this.$store)
            let app = this;
            setInterval(() => {
                axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/coin/${this.$route.params.coin}`)
                    .then(response => {
                        this.coinImage = response.data[0].image;
                        this.high = response.data[0].high_24h;
                        this.low = response.data[0].low_24h;
                        this.current_price = response.data[0].current_price;
                        this.last_updated = response.data[0].last_updated;
                        this.price_change_24h = response.data[0].price_change_24h;
                        this.price_change_percentage_24h = response.data[0].price_change_percentage_24h;
                        this.overlay = false;
                    })
            }, 1000)


            let temp;
            var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
            socket.on(app.$route.params.coin, fetchedData => {
                if (fetchedData[fetchedData.length - 1]["Fiyat"] != temp || !temp) {

                    //app.graphData = fetchedData
                    let tempDates = [];
                    let time;
                    let tempValues = [];
                    for (let i = 0; i < fetchedData.length; i++) {
                        time = new Date(fetchedData[i]["createdAt"]);
                        tempDates.push(time.toLocaleString('tr'));
                        tempValues.push(fetchedData[i]["Fiyat"])
                    }
                    this.series = [{
                        data: tempValues
                    }]
                    this.chartOptions = {
                        xaxis: {
                            categories: tempDates
                        }
                    }
                    temp = fetchedData[fetchedData.length - 1]["Fiyat"];
                }
            })
        },
        watch: {
            time(newVal, oldVal) {
                console.log(newVal, oldVal);
                this.getGraphData();
            },
            current_price(newValue, oldValue) {
                console.log(newValue + "---" + oldValue + "degişti")
                if (+newValue < +oldValue) {
                    this.state = -1;
                } else {
                    this.state = 1;
                }
            }
        }
    };
</script>

<style scoped>
    @keyframes price-up {
        0% {
            background-color: darkgreen;
        }
        100% {
            background-color: unset;
        }
    }
    
    @keyframes price-down {
        0% {
            background-color: red;
        }
        100% {
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
</style>