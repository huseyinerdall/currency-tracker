<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      item-class="d-none"
      hide-default-footer
      :items-per-page="itemPerPage"
      style="border: 1px solid #ddd;border-radius:0;"
      :style="[
        $store.state.isLight
          ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
          : 'color:#ffffff;background-color:rgba(0,0,0,.3);'
      ]"
      class="mt-2"
      mobile-breakpoint="0"
      dense
      :dark="!$store.state.isLight"
      :light="$store.state.isLight"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td
            :style="
              $vuetify.breakpoint.smAndDown ? 'padding: 0 2px !important;' : ''
            "
          >
            <v-avatar size="32">
              <img :src="item.image" alt="" />
            </v-avatar>
          </td>
          <td :class="{ 'black--text': $store.state.isLight }">
            <router-link
              :to="{
                name: 'ExchangeDetailPage',
                params: { exchangeid: item.id }
              }"
              tag="span"
              class="body-1"
              :style="
                `font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`
              "
            >
              {{ item.name }}
            </router-link>
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
              {{ item.country || "-" }}
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
              {{ item.year_established || "-" }}
            </h3>
          </td>

          <td :class="{ 'black--text': $store.state.isLight }">
            <div class="row">
              <v-rating
                :value="item.trust_score / 2"
                background-color="white"
                color="#e91e63"
                dense
                small
                :x-small="$vuetify.breakpoint.smAndDown"
                readonly
                half-increments
                hover
              ></v-rating>
              <span class="grey--text text--lighten-2 text-caption mr-2">
                ({{ item.trust_score / 2 }})
              </span>
            </div>
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :class="{ 'black--text': $store.state.isLight }"
          >
            <h3 :style="`font-size: ${$store.state.tdFontSize} !important;`">
              {{ item.trade_volume_24h_btc | turkishCurrencyformat }}
            </h3>
          </td>
        </tr>
      </template>
    </v-data-table>
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
import axios from "axios";

export default {
  data(app) {
    return {
      overlay: true,
      itemPerPage: 100,
      headers: [
        {
          text: "",
          align: "start",
          sortable: false,
          value: "image",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 caption",
          filterable: false
        },
        {
          text: "İsim",
          align: "start",
          sortable: false,
          value: "name",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1 caption"
        },
        {
          text: "Ülke",
          align: "start",
          sortable: false,
          value: "country",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1 caption"
        },
        {
          text: "Yıl",
          value: "year_established",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1 caption",
          filterable: false
        },
        {
          text: "Güven Skoru",
          value: "trust_score",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 caption",
          filterable: false
        },
        {
          text: "Son 24 Saat Hacim(BTC)",
          value: "trade_volume_24h_btc",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1 caption",
          filterable: false
        }
      ],
      data: []
    };
  },
  created() {
    let app = this;
    if (this.$vuetify.breakpoint.smAndDown) {
      this.headers.splice(2, 1);
      this.headers.splice(2, 1);
      this.headers.splice(3, 1);
    }
    if (localStorage.getItem("exchanges")) {
      app.data = JSON.parse(localStorage.getItem("exchanges"));
      this.overlay = false;
    }
    this.getExchangesInfos();
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
          text: "İsim",
          align: "start",
          sortable: false,
          value: "name",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Ülke",
          align: "start",
          sortable: false,
          value: "country",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Yıl",
          value: "year_established",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Güven Skoru",
          value: "trust_score",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          filterable: false
        },
        {
          text: "Son 24 Saat Hacim(BTC)",
          value: "trade_volume_24h_btc",
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
  methods: {
    getExchangesInfos() {
      axios
        .get(`${this.$store.state.api}/exchanges`)
        .then(res => {
          this.data = res.data;
          this.overlay = false;
          localStorage.setItem("exchanges", JSON.stringify(res.data));
        })
        .catch(err => {
          this.overlay = false;
          this.$toasted.show(err, { fullWidth: true });
        });
    }
  }
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
</style>
