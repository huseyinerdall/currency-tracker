<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="700"
    style="border-radius:0 !important;"
    v-model="$store.state.userwalletdialog"
  >
    <v-container
      style="border: 1px solid #ddd;border-radius:0;position:relative;"
      :style="
        $store.state.isLight
          ? 'background-color:#f9f9f9;'
          : 'background-color:rgba(11,14,63,0.8);'
      "
    >
      <v-row class="justify-space-between">
        <v-col cols="10">
          <h1 class="white--text">{{ balance | turkishCurrencyformat }} ₺</h1>
          <h4 class="white--text">
            {{ avaibleBalance | turkishCurrencyformat }} ₺
          </h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
          <v-btn icon :disabled="!walletLoaded" @click="getUserWallet">
            <v-icon color="white" :class="[walletLoaded ? '' : 'mdi-spin']"
              >mdi-reload</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="data"
        dense
        mobile-breakpoint="0"
        hide-default-footer
        :items-per-page="itemPerPage"
        style="border: 1px solid #ddd;border-radius:0;"
      >
        <template v-slot:item="{ item }">
          <tr v-if="+item.amount > 0">
            <td
              class="text-uppercase white--text"
              :style="[
                $store.state.isLight
                  ? 'color:rgba(0,0,0,0.87) !important;'
                  : 'color:#ffffff !important;'
              ]"
            >
              {{ item.shortName }}
            </td>
            <td
              class="text-right white--text"
              :style="[
                $store.state.isLight
                  ? 'color:rgba(0,0,0,0.87) !important;'
                  : 'color:#ffffff !important;'
              ]"
            >
              {{ item["amount"] | turkishCurrencyformat }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import io from "socket.io-client";
export default {
  name: "UserWalletModal",
  data: () => ({
    data: [],
    allUnits: [],
    menu: false,
    dolar: 1,
    itemPerPage: 500,
    avaibleBalance: 0,
    balance: 0,
    headers: [
      {
        text: "Varlık",
        align: "start",
        sortable: false,
        value: "shortName",
        class: "white--text"
      },
      {
        text: "Miktar",
        value: "amount",
        sortable: false,
        align: "end",
        class: "white--text"
      }
    ],
    walletLoaded: false
  }),
  created() {
    let app = this;
    axios.get("https://finans.truncgil.com/today.json").then(response => {
      app.dolar = parseFloat(response.data["ABD DOLARI"]["Satış"]);
    });
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("allprices", fetchedData => {
      localStorage.setItem("allprices", JSON.stringify(fetchedData));
    });
    if (localStorage.getItem("user")) {
      this.getUserWallet();
    }
  },
  methods: {
    getUserWallet: function() {
      this.walletLoaded = false;
      this.balance = 0;
      axios
        .post(`${this.$store.state.api}/getuserwallet`, {
          id: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          let allPrices = JSON.parse(localStorage.getItem("allprices"));
          this.data = Object.values(response.data);
          for (const wealth in response.data) {
            if (wealth == "TÜRK LİRASI") {
              this.avaibleBalance = response.data[wealth].amount;
            }
            this.balance +=
              response.data[wealth].amount *
              ((allPrices[wealth] < 0
                ? this.dolar * allPrices[wealth] * -1
                : allPrices[wealth]) || 0);
            this.walletLoaded = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState({
    userwalletdialog: state => state.userwalletdialog
  })
};
</script>
<style>
.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
  background-attachment: fixed;
}
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid #444767 !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0 10px !important;
}
.v-dialog {
  border-radius: 0 !important;
}
.theme--light.v-btn.v-btn--disabled .v-icon,
.theme--light.v-btn.v-btn--disabled .v-btn__loading {
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
<style scoped>
.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}
h3 {
  cursor: pointer;
}
.v-data-table__wrapper thead {
  border-bottom: 1px solid #5e6593 !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom-color: #ddd !important;
}
.pinkk {
  color: #ff3366 !important;
}
.theme--light.v-data-table {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

.apexcharts-toolbar {
  z-index: 0 !important;
}
.apexcharts-tooltip {
  text-align: center !important;
  border-radius: 0 !important;
}
@media screen and (max-width: 768px) {
  .apexcharts-yaxis {
    display: none;
  }
}
</style>
