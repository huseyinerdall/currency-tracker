<template>
  <div>
    <v-text-field
      v-if="!isHomepage"
      v-model="search"
      append-icon="mdi-magnify"
      label="Kripto para ara"
      single-line
      hide-details
      :light="$store.state.isLight"
      :dark="!$store.state.isLight"
      :color="$store.state.isLight ? '#fff' : '#000'"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="data"
      item-class="d-none"
      hide-default-footer
      :loading="!coinloaded"
      :items-per-page="itemPerPage"
      :page.sync="page"
      @page-count="pageCount = $event"
      style="border: 1px solid #ddd;border-radius:0;"
      :style="[
        $store.state.isLight
          ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
          : 'color:#ffffff;background-color:rgba(0,0,0,.3);'
      ]"
      class="mt-2"
      mobile-breakpoint="0"
      dense
      :search="search"
      :dark="!$store.state.isLight"
      :light="$store.state.isLight"
    >
      <template v-slot:item="{ item }">
        <tr
          :class="{
            '': item.price - priceStates[item.name] == 0,
            'price-up': item.price - priceStates[item.name] > 0,
            'price-down': item.price - priceStates[item.name] < 0
          }"
          :assignment="(priceStates[item.name] = item.price)"
        >
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <v-avatar size="32">
              <img :src="item.image" alt="" />
            </v-avatar>
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <router-link
              :to="{ name: 'Coins', params: { coin: item.name } }"
              tag="h3"
              class="body-1 text-uppercase"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              v-if="$vuetify.breakpoint.smAndDown"
            >
              {{ item.name | shorten }}
            </router-link>
            <router-link
              :to="{ name: 'Coins', params: { coin: item.name } }"
              tag="h3"
              class="body-1 text-uppercase"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              v-else
            >
              {{ item.name }}
            </router-link>
          </td>
          <td :class="{ 'black--text': $store.state.isLight }">
            <router-link
              :to="{ name: 'Coins', params: { coin: item.name } }"
              tag="h3"
              class="body-1 text-uppercase"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.shortName | uppercase }}
            </router-link>
          </td>
          <td :class="{ 'black--text': $store.state.isLight }">
            <h3
              :style="
                `font-size: ${$store.state.tdFontSize} !important;font-weight:400;`
              "
            >
              {{ item.price | binayracveondalik }}
            </h3>
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <h3
              :style="
                `font-size: ${$store.state.tdFontSize} !important;font-weight:400;`
              "
            >
              {{ (item.price * $store.state.dolar) | binayracveondalik }}
            </h3>
          </td>

          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <span
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.market_cap | binayracveondalik }}</span
            >
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <span
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.volume | binayracveondalik }}</span
            >
          </td>
          <td>
            <span
              :class="[item.pricechange24h >= 0 ? 'green--text' : 'red--text']"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.pricechange24h | signint }}</span
            >
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <span
              :class="[item.pricechange7d >= 0 ? 'green--text' : 'red--text']"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.pricechange7d | signint }}</span
            >
          </td>
          <td :class="{ 'black--text': $store.state.isLight }">
            <span
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.time | onlyTime }}</span
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-pagination
      v-if="!isHomepage"
      v-model="page"
      :length="pageCount"
    ></v-pagination>
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
//import axios from "axios";
//import coins from '../assets/coins.json';
import io from "socket.io-client";

export default {
  data(app) {
    return {
      coinloaded: true,
      isHomepage: true,
      overlay: true,
      page: 1,
      pageCount: 0,
      itemPerPage: 50,
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "image",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Kurlar",
          align: "start",
          sortable: false,
          value: "name",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Sembol",
          align: "start",
          sortable: false,
          value: "shortName",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Fiyat(USD)",
          value: "price",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fiyat(TL)",
          value: "priceTL",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Değeri",
          value: "market_cap",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Piyasa Hacmi",
          value: "volume",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fark (24S)",
          value: "pricechange24h",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fark (7G)",
          value: "pricechange7d",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Saat",
          value: "time",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        }
      ],
      data: [],
      dolar: 1,
      search: "",
      priceStates: {}
    };
  },
  created() {
    let app = this;
    app.isHomepage = app.$route.path == "/";
    if (this.$vuetify.breakpoint.smAndDown) {
      this.headers.splice(0, 1); // bitcoin logoları mobil
      this.headers.splice(1, 1);
      this.headers.splice(2, 3);
      this.headers.splice(3, 1);
    }
    if (localStorage.getItem("coins250")) {
      app.data = JSON.parse(localStorage.getItem("coins250"));
      this.overlay = false;
    }
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("coins", fetchedData => {
      app.data = fetchedData;
      localStorage.setItem("coins250", JSON.stringify(fetchedData));
      app.overlay = false;
    });
  },
  mounted() {},
  computed: {
    isLight() {
      return this.$store.state.isLight;
    }
  },
  watch: {
    isLight() {
      this.headers = [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "image",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Kurlar",
          align: "start",
          sortable: false,
          value: "name",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Sembol",
          align: "start",
          sortable: false,
          value: "shortName",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Fiyat(USD)",
          value: "price",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fiyat(TL)",
          value: "priceTL",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Değeri",
          value: "market_cap",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Piyasa Hacmi",
          value: "volume",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fark (24S)",
          value: "pricechange24h",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Fark (7G)",
          value: "pricechange7d",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Saat",
          value: "time",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        }
      ];
    }
  },
  methods: {}
};
</script>

<style scoped>
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

td {
  color: white !important;
}

h3 {
  cursor: pointer;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
</style>
<style>
/*.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: transparent !important;
}*/
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
</style>
<style>
.theme--dark.v-data-table {
  background-color: rgba(0, 0, 0, 0.2) !important;
  color: #ffffff;
}
.pinkk {
  color: #ff3366 !important;
}
</style>
