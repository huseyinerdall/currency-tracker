<template>
  <div>
    <table
      class="mt-6 mb-6"
      style="table-layout:fixed;"
      :style="
        $store.state.isLight
          ? 'background-color:rgba(255,255,255,0.3) !important;color:rgba(0,0,0,0.83) !important;'
          : 'background-color:rgba(0,0,0,0.3) !important;color:rgba(255,255,255,0.83) !important;'
      "
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <thead>
        <tr style="height:32px;">
          <th style="border-left: 0 !important;width:160px;"></th>
          <th
            v-for="currency in value"
            :key="currency"
            style="font-size:14px;"
            :class="$store.state.isLight ? 'pinkk' : 'amber--text accent-3'"
          >
            <div
              style="display: flex;flex-direction: row;justify-content: end;align-items:center;"
            >
              <v-spacer></v-spacer>
              <v-img
                max-width="30"
                max-height="30"
                class="mr-2"
                :src="images[currency]"
              ></v-img>
              <span>{{ currency | shorten }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="currencyRow in value" :key="currencyRow">
          <th style="border-left: 0 !important;font-size:14px;">
            <span
              :class="
                $store.state.isLight
                  ? 'pinkk text-right'
                  : 'amber--text accent-3 text-right'
              "
              >1 {{ currencyRow | shorten }}</span
            >
            <p style="font-size: 12px;">Ters Parite</p>
          </th>
          <td
            v-for="currencyCol in value"
            :class="[data[currencyCol] / data[currencyRow] == 1 ? 'bir' : '']"
            :key="currencyCol"
          >
            <p>
              {{
                (data[currencyRow] / data[currencyCol]) | turkishCurrencyformat
              }}
            </p>
            <p style="font-size: 12px;">
              {{
                (data[currencyCol] / data[currencyRow]) | turkishCurrencyformat
              }}
            </p>
          </td>
        </tr>
        <tr>
          <td :colspan="value.length + 1">
            <v-select
              :items="items"
              item-text="name"
              v-model="value"
              multiple
              style="width: 200px"
              class="ma-0"
              :dark="!$store.state.isLight"
              prepend-icon="mdi-plus-circle-outline"
            >
              <template v-slot:selection="{ index }">
                <span
                  style="text-align: center;font-size:14px;"
                  :style="
                    $store.state.isLight
                      ? 'color:rgba(0,0,0,0.83);'
                      : 'color:rgba(255,255,255,0.83);'
                  "
                  v-if="index === 0"
                >
                  Ekle/Kaldır
                </span>
              </template>
            </v-select>
          </td>
        </tr>
      </tbody>
    </table>

    <v-list v-else class="mobile-list">
      <v-alert color="#2A3B4D" dark icon="mdi-information-variant" dense>
        Parite dönüşümü için kurun üzerine tıklayın.
      </v-alert>
      <v-list-item-group
        v-model="currentCurrency"
        active-class="border"
        color="indigo"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          style="border-bottom: 1px solid #5e6593;"
        >
          <v-list-item-icon>
            <!--<span style="width: 50px;line-height:48px;">{{i == model ? 'from' : 'to'}}</span>-->
            <v-avatar width="50">
              <img width="40" :src="item.image" :alt="item.image" />
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content>
            <div class="d-flex flex-row justify-content-between">
              <div style="color:#fff;padding-top:3px;">1 {{ item.symbol }}</div>
              <v-icon class="ml-1 mr-1" color="#fff">mdi-arrow-right</v-icon>
              <div style="color:#fff;padding-top:3px;">
                {{
                  (data[item.name] / data[items[currentCurrency]["name"]])
                    | turkishCurrencyformat
                }}
                {{ items[currentCurrency]["symbol"] }}
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-overlay
      :opacity="1"
      :value="overlay"
      :color="
        $store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
      "
    >
      <v-progress-circular
        indeterminate
        size="64"
        :color="
          !$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
        "
      >
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import currencies from "../assets/currencies.js";
import images from "../assets/images.js";
import io from "socket.io-client";

export default {
  name: "MatrisTable",
  data: () => ({
    items: currencies,
    overlay: false, //true
    value: [
      "EURO",
      "ABD DOLARI",
      "TÜRK LİRASI",
      "İNGİLİZ STERLİNİ",
      "KANADA DOLARI",
      "SUUDİ ARABİSTAN RİYALİ",
      "JAPON YENİ"
    ],
    data: {},
    currentCurrency: 1,
    images: images
  }),
  methods: {
    click: function() {
      document.getElementsByClassName("v-menu__content")[0].style.display =
        "block";
    }
  },
  watch: {
    /*currentCurrency(newValue,oldValue){
      let a = newValue+oldValue;
      console.log(a)
    },*/
    value() {
      if (this.value.length >= 8) {
        this.value.splice(3, 1);
      }
    }
  },
  created() {
    let app = this;
    app.data["TÜRK LİRASI"] = 1;
    let ONE = 1;
    if (localStorage.getItem("currencies")) {
      if (ONE == 1) {
        app.value = [
          "EURO",
          "ABD DOLARI",
          "TÜRK LİRASI",
          "İNGİLİZ STERLİNİ",
          "KANADA DOLARI",
          "SUUDİ ARABİSTAN RİYALİ",
          "JAPON YENİ"
        ];
        ONE = 2;
        app.currentCurrency = 0;
      }
      for (const currency of JSON.parse(localStorage.getItem("currencies"))) {
        app.data[currency["type"]] = currency["Satış"];
      }
      app.overlay = false;
    }
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("currencies", fetchedData => {
      localStorage.setItem("currencies", JSON.stringify(fetchedData));
      if (ONE == 1) {
        app.value = [
          "EURO",
          "ABD DOLARI",
          "TÜRK LİRASI",
          "İNGİLİZ STERLİNİ",
          "KANADA DOLARI",
          "SUUDİ ARABİSTAN RİYALİ",
          "JAPON YENİ"
        ];
        ONE = 2;
        app.currentCurrency = 0;
      }
      for (const currency of fetchedData) {
        app.data[currency["type"]] = currency["Satış"];
      }
      app.overlay = false;
    });
  },
  mounted() {}
};
</script>

<style scoped>
table {
  width: 100% !important;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff !important;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

tr {
  text-align: right;
  border-bottom: 1pt solid #ddd;
}

td {
  padding: 1px;
}

th {
  padding: 1px;
}

.bir {
  color: gray;
  user-select: none;
}

.border {
  border: 2px dashed orange;
}

p {
  margin-bottom: 0 !important;
}

.theme--light.v-text-field > .v-input__control > .v-input__slot:before,
.theme--light.v-text-field:not(.v-input--has-state):hover
  > .v-input__control
  > .v-input__slot:before {
  display: none !important;
  border-color: transparent !important;
}

.v-sheet.v-list {
  border-radius: 0;
}

.v-list-item__title {
  color: #fff !important;
}

.theme--light.v-list.mobile-list {
  color: #fff !important;
  background: rgba(0, 0, 0, 0.3) !important;
}

.v-text-field > .v-input__control > .v-input__slot:before,
.v-text-field > .v-input__control > .v-input__slot:after {
  width: 0 !important;
}
.pinkk {
  color: #ff3366 !important;
}
</style>
