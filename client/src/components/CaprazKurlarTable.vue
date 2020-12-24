<template>
  <div>
    <table style="table-layout:fixed;">
      <thead class="amber--text accent-3">
        <tr>
          <th>Çapraz Kurlar</th><th>Parite</th><th>Fark</th><th>Yüzde</th><th>Saat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ symbols[0] }}</td>
          <td>{{ data[3]["Satış"]/data[0]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[1] }}</td>
          <td>{{ data[0]["Satış"]/data[3]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[2] }}</td>
          <td>{{ data[4]["Satış"]/data[0]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[3] }}</td>
          <td>{{ data[0]["Satış"]/data[4]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[4] }}</td>
          <td>{{ data[7]["Satış"]/data[0]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[5] }}</td>
          <td>{{ data[0]["Satış"]/data[7]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[6] }}</td>
          <td>{{ data[11]["Satış"]/data[0]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[7] }}</td>
          <td>{{ data[0]["Satış"]/data[11]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[8] }}</td>
          <td>{{ data[3]["Satış"]/data[4]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[8] }}</td>
          <td>{{ data[4]["Satış"]/data[3]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[10] }}</td>
          <td>{{ data[7]["Satış"]/data[3]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[11] }}</td>
          <td>{{ data[3]["Satış"]/data[7]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[12] }}</td>
          <td>{{ data[11]["Satış"]/data[3]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[13] }}</td>
          <td>{{ data[3]["Satış"]/data[11]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[14] }}</td>
          <td>{{ data[16]["Satış"]/data[3]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
        <tr>
          <td>{{ symbols[15] }}</td>
          <td>{{ data[3]["Satış"]/data[16]["Satış"] | tofixedfour }}</td>
          <td></td>
          <td></td>
          <td>{{ data[0]["time"] | onlyTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
//import axios from "axios";
import currencies from '../assets/currencies.js';
import io from "socket.io-client";

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
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}:${this.$store.state.port}`);
    socket.on("currencies", fetchedData => {
      console.log(fetchedData);
      app.data = fetchedData
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
}

td {
  padding: 10px;
}

th {
  padding: 10px;
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
