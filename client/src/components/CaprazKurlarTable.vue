<template>
  <div>
    <v-chip
        class="ma-0 amber accent-3"
        label
    >
      Pariteler
    </v-chip>
    <table style="table-layout:fixed;" class="mt-1">
      <thead class="amber--text accent-3">
        <tr style="font-size:14px !important;">
          <th>Çapraz Kurlar</th><th>Parite</th><th>Fark</th><th>Yüzde</th><th>Saat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ symbols[0] }}</td>
          <td>{{ data[3]["today"]/data[0]["today"] | tofixedfour }}</td>
          <td :class="[(data[3]['today']/data[0]['today'] - data[3]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[0]">
            {{ (data[3]["today"]/data[0]["today"]) - (data[3]["yesterday"]/data[0]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[3]['today']/data[0]['today'] - data[3]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[3]["today"]/data[0]["today"]) - (data[3]["yesterday"]/data[0]["yesterday"]))/data[0]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[1] }}</td>
          <td>{{ data[0]["today"]/data[3]["today"] | tofixedfour }}</td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[1]">
            {{ (data[0]["today"]/data[3]["today"]) - (data[0]["yesterday"]/data[3]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[0]["today"]/data[3]["today"]) - (data[0]["yesterday"]/data[3]["yesterday"]))/data[3]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[2] }}</td>
          <td>{{ data[4]["today"]/data[0]["today"] | tofixedfour }}</td>
          <td :class="[(data[4]['today']/data[0]['today'] - data[4]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[2]">
            {{ (data[4]["today"]/data[0]["today"]) - (data[4]["yesterday"]/data[0]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[4]['today']/data[0]['today'] - data[4]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[4]["today"]/data[0]["today"]) - (data[4]["yesterday"]/data[0]["yesterday"]))/data[0]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[3] }}</td>
          <td>{{ data[0]["today"]/data[4]["today"] | tofixedfour }}</td>
          <td :class="[(data[0]['today']/data[4]['today'] - data[0]['yesterday']/data[4]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[3]">
            {{ (data[0]["today"]/data[4]["today"]) - (data[0]["yesterday"]/data[4]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[4]['today'] - data[0]['yesterday']/data[4]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[0]["today"]/data[4]["today"]) - (data[0]["yesterday"]/data[4]["yesterday"]))/data[4]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[4] }}</td>
          <td>{{ data[7]["today"]/data[0]["today"] | tofixedfour }}</td>
          <td :class="[(data[7]['today']/data[0]['today'] - data[7]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[4]">
            {{ (data[7]["today"]/data[0]["today"]) - (data[7]["yesterday"]/data[0]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[3]['today']/data[0]['today'] - data[3]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[7]["today"]/data[0]["today"]) - (data[7]["yesterday"]/data[0]["yesterday"]))/data[0]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[5] }}</td>
          <td>{{ data[0]["today"]/data[7]["today"] | tofixedfour }}</td>
          <td :class="[(data[0]['today']/data[7]['today'] - data[0]['yesterday']/data[7]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[5]">
            {{ (data[0]["today"]/data[7]["today"]) - (data[0]["yesterday"]/data[7]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[0]["today"]/data[7]["today"]) - (data[0]["yesterday"]/data[7]["yesterday"]))/data[7]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[6] }}</td>
          <td>{{ data[11]["today"]/data[0]["today"] | tofixedfour }}</td>
          <td :class="[(data[7]['today']/data[0]['today'] - data[7]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[6]">
            {{ (data[11]["today"]/data[0]["today"]) - (data[11]["yesterday"]/data[0]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[11]['today']/data[0]['today'] - data[11]['yesterday']/data[0]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[11]["today"]/data[0]["today"]) - (data[11]["yesterday"]/data[0]["yesterday"]))/data[0]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[7] }}</td>
          <td>{{ data[0]["today"]/data[11]["today"] | tofixedfour }}</td>
          <td :class="[(data[0]['today']/data[7]['today'] - data[0]['yesterday']/data[7]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[7]">
            {{ (data[0]["today"]/data[11]["today"]) - (data[0]["yesterday"]/data[11]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[0]["today"]/data[11]["today"]) - (data[0]["yesterday"]/data[11]["yesterday"]))/data[11]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>

        <tr>
          <td>{{ symbols[8] }}</td>
          <td>{{ data[3]["today"]/data[4]["today"] | tofixedfour }}</td>
          <td :class="[(data[3]['today']/data[4]['today'] - data[3]['yesterday']/data[4]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[8]">
            {{ (data[3]["today"]/data[4]["today"]) - (data[3]["yesterday"]/data[4]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[3]["today"]/data[4]["today"]) - (data[3]["yesterday"]/data[4]["yesterday"]))/data[4]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>

        <tr>
          <td>{{ symbols[9] }}</td>
          <td>{{ data[4]["today"]/data[3]["today"] | tofixedfour }}</td>
          <td :class="[(data[4]['today']/data[3]['today'] - data[4]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[7]">
            {{ (data[4]["today"]/data[3]["today"]) - (data[4]["yesterday"]/data[3]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[4]['today']/data[3]['today'] - data[4]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[4]["today"]/data[3]["today"]) - (data[4]["yesterday"]/data[3]["yesterday"]))/data[3]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[10] }}</td>
          <td>{{ data[7]["today"]/data[3]["today"] | tofixedfour }}</td>
          <td :class="[(data[7]['today']/data[3]['today'] - data[7]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[7]">
            {{ (data[7]["today"]/data[3]["today"]) - (data[7]["yesterday"]/data[3]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[7]['today']/data[3]['today'] - data[7]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[7]["today"]/data[3]["today"]) - (data[7]["yesterday"]/data[3]["yesterday"]))/data[3]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[11] }}</td>
          <td>{{ data[3]["today"]/data[7]["today"] | tofixedfour }}</td>
          <td :class="[(data[3]['today']/data[7]['today'] - data[3]['yesterday']/data[7]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[8]">
            {{ (data[3]["today"]/data[7]["today"]) - (data[3]["yesterday"]/data[7]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[0]['today']/data[3]['today'] - data[0]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[3]["today"]/data[7]["today"]) - (data[3]["yesterday"]/data[7]["yesterday"]))/data[7]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[12] }}</td>
          <td>{{ data[11]["today"]/data[3]["today"] | tofixedfour }}</td>
          <td :class="[(data[11]['today']/data[3]['today'] - data[11]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[12]">
            {{ (data[11]["today"]/data[3]["today"]) - (data[11]["yesterday"]/data[3]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[11]['today']/data[3]['today'] - data[11]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[11]["today"]/data[3]["today"]) - (data[11]["yesterday"]/data[3]["yesterday"]))/data[3]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[13] }}</td>
          <td>{{ data[3]["today"]/data[11]["today"] | tofixedfour }}</td>
          <td :class="[(data[3]['today']/data[11]['today'] - data[3]['yesterday']/data[11]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[13]">
            {{ (data[3]["today"]/data[11]["today"]) - (data[3]["yesterday"]/data[11]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[3]['today']/data[11]['today'] - data[3]['yesterday']/data[11]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[3]["today"]/data[11]["today"]) - (data[3]["yesterday"]/data[11]["yesterday"]))/data[11]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[14] }}</td>
          <td>{{ data[16]["today"]/data[3]["today"] | tofixedfour }}</td>
          <td :class="[(data[11]['today']/data[3]['today'] - data[11]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[14]">
            {{ (data[16]["today"]/data[3]["today"]) - (data[16]["yesterday"]/data[3]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[16]['today']/data[3]['today'] - data[16]['yesterday']/data[3]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[16]["today"]/data[3]["today"]) - (data[16]["yesterday"]/data[3]["yesterday"]))/data[3]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[15] }}</td>
          <td>{{ data[3]["today"]/data[16]["today"] | tofixedfour }}</td>
          <td :class="[(data[3]['today']/data[11]['today'] - data[3]['yesterday']/data[11]['yesterday'])>=0 ? 'green--text' : 'red--text']"
              :key="symbols[15]">
            {{ (data[3]["today"]/data[16]["today"]) - (data[3]["yesterday"]/data[16]["yesterday"]) | signintt }}
          </td>
          <td :class="[(data[3]['today']/data[16]['today'] - data[3]['yesterday']/data[16]['yesterday'])>=0 ? 'green--text' : 'red--text']">
            {{ ((data[3]["today"]/data[16]["today"]) - (data[3]["yesterday"]/data[16]["yesterday"]))/data[16]["today"]*100 | signintt }}%
          </td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
//import axios from "axios";
import currencies from '../assets/currencies.js';
//import io from "socket.io-client";
import axios from "axios";

export default {
  data () {
    return {
      goldloaded: true,
      currencies: currencies,
      symbols: [
          "EUR/USD","USD/EUR","GBP/USD","USD/GBP","CAD/USD","USD/CAD","JPY/USD","USD/JPY",
          "EUR/GBP","GBP/EUR","CAD/EUR","EUR/CAD","JPY/EUR","EUR/JPY","CNY/EUR","EUR/CNY"
      ],
      data: []
    }
  },
  created() {
    //let app = this;
    axios.get(`http://${this.$store.state.addr}:${this.$store.state.port}/pariteler`)
        .then(response => {
          let fetchedData = response.data;
          console.log(fetchedData)
          this.data = response.data;
        })
  },
  methods: {
  },
}
</script>

<style scoped>
table {
  width: 100% !important;
  background-color: rgba(0, 0, 0, .3);
  color: #fff !important;
  border:1px solid #5e6593;
  border-collapse: collapse;

}

tr {
  text-align: center;
  border-bottom: 1pt solid #5e6593;
  font-size: 12px !important;
}

td {
  padding: 2px;
}

th {
  padding: 4px;
}
@media screen and (max-width: 768px){
  table tr td:nth-child(3),
  table tr th:nth-child(3),
  table tr td:nth-child(4),
  table tr th:nth-child(4){
    display:none;
  }
}
</style>
