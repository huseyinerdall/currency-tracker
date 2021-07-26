<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      hide-default-footer
      :loading="!goldloaded"
      disable-pagination
      style="border: 1px solid #ddd;border-radius:0;"
      :style="[
        $store.state.isLight
          ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3) !important;'
          : 'color:#ffffff;background-color:rgba(0,0,0,.3) !important;'
      ]"
      mobile-breakpoint="0"
      class="mt-1"
      dense
      :dark="!$store.state.isLight"
      :light="$store.state.isLight"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td
            :style="[
              $store.state.isLight
                ? 'color:rgba(0,0,0,0.87) !important;border-color:#ddd !important;'
                : 'color:#ffffff !important;'
            ]"
          >
            <router-link
              :to="{
                name: 'Golds',
                params: {
                  gold: item.type
                    .toLocaleLowerCase('tr-TR')
                    .split(' ')
                    .join('-')
                }
              }"
              tag="span"
              class="body-1 text-uppercase"
              :style="
                `font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`
              "
              >{{ item.type | shorten }}</router-link
            >
          </td>
          <td
            :style="[
              $store.state.isLight
                ? 'color:rgba(0,0,0,0.87) !important;'
                : 'color:#ffffff !important;'
            ]"
          >
            <span
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.Alış }}</span
            >
          </td>
          <td
            :style="[
              $store.state.isLight
                ? 'color:rgba(0,0,0,0.87) !important;'
                : 'color:#ffffff !important;'
            ]"
          >
            <span
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.Satış }}</span
            >
            <v-icon
              v-if="
                $vuetify.breakpoint.smAndDown &&
                item['Değişim'].indexOf('-')<0
              "
              class="float-right"
              size="20"
              color="green"
            >
              mdi-arrow-up-bold
            </v-icon>
            <v-icon
              v-else-if="
                $vuetify.breakpoint.smAndDown &&
                !(item['Değişim'].indexOf('-')<0)
              "
              class="float-right"
              size="20"
              color="red"
            >
              mdi-arrow-down-bold
            </v-icon>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span
                :class="[
                  item['Değişim'].indexOf('-')<0
                  ? 'green--text'
                  : 'red--text'
              ]"
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
            >
              {{
                (parseFloat(item["Satış"].replace('$','').replace('.','').replace(',','.')) * parseFloat(item['Değişim'].replace('%','').replace(',','.')))/100 | signint
              }}
            </span>
          </td>
          <td v-if="!$vuetify.breakpoint.smAndDown">
            <span
              :class="[
                  item['Değişim'].indexOf('-')<0
                  ? 'green--text'
                  : 'red--text'
              ]"
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
            >
              {{
                item["Değişim"]
              }}
            </span>
          </td>
          <td
            v-if="!$vuetify.breakpoint.smAndDown"
            :style="[
              $store.state.isLight
                ? 'color:rgba(0,0,0,0.87) !important;'
                : 'color:#ffffff !important;'
            ]"
          >
            <span
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.time | onlyTime }}</span
            >
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
//import axios from "axios";
import io from "socket.io-client";

export default {
  data(app) {
    return {
      goldloaded: true,
      headers: [
        {
          text: "Altın Kurları",
          align: "start",
          sortable: false,
          value: "type",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          width: "130px"
        },
        {
          text: "Alış",
          value: "Alış",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Satış",
          value: "Satış",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Fark",
          value: "Yuzde",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Yüzde",
          value: "Değişim",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Saat",
          value: "time",
          sortable: false,
          align: "start",
          class: app.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        }
      ],
      data: [],
      overlay: false
    };
  },
  created() {
    let app = this;
    if (this.$vuetify.breakpoint.smAndDown) {
      this.headers.pop();
      this.headers.pop();
      this.headers.pop();
    }
    if (localStorage.getItem("golds")) {
      app.data = JSON.parse(localStorage.getItem("golds"));
      this.overlay = false;
    }

    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("golds", fetchedData => {
      app.data = fetchedData;
      localStorage.setItem("golds", JSON.stringify(fetchedData));
      //app.overlay = false;
    });
  },
  computed: {
    isLight() {
      return this.$store.state.isLight;
    }
  },
  watch: {
    isLight() {
      this.headers = [
        {
          text: "Döviz Kurları",
          align: "start",
          sortable: false,
          value: "type",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          width: "160px"
        },
        {
          text: "Alış",
          value: "Alış",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Satış",
          value: "Satış",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Yüzde",
          value: "Yuzde",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Fark",
          value: "Fark",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
        },
        {
          text: "Saat",
          value: "time",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1"
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
h3 {
  cursor: pointer;
}
.v-data-table__wrapper thead {
  border-bottom: 1px solid #ddd !important;
}
</style>
