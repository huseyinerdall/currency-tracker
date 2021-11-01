<template>
  <div class="userwallet pt-lg-4">
    <div class="d-flex row justify-space-between pl-3 pr-3 mt-2 mb-3">

      <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
          :quote="sharing.quote"
          :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser"
      >
        <v-btn
          :color="network.color"
          class="text--white"
          tile
          block
          :width="$vuetify.breakpoint.smAndDown ? '' :'200'"
        >
          <v-icon color="white">{{ network.icon  }}</v-icon>
          <span class="white--text">{{ network.name }}</span>
        </v-btn>
      </ShareNetwork>
    </div>
    <div>
      <v-alert
        border="right"
        colored-border
        type="error"
        elevation="2"
        v-if="userinfo.active == 0"
        dense
        class="mt-6 caption"
        dismissible
      >
        Hesabınız aktif değil.Bu haldeyken al sat yapamazsınız.Hesabı aktif hale
        getirmek için
        <v-chip small>{{ userinfo.email }}</v-chip> adresinize
        <v-btn x-small @click="sendActivationCode">buraya</v-btn>
        tıklayarak eposta gönderin.
      </v-alert>
      <v-row>
        <v-col class="col-md-12">
          <v-row>
            <v-col cols="12" md="6">
              <v-card
                style="border: 1px solid #ddd;border-radius:6px;background: transparent;"
                :loading="loading1"
              >
                <template slot="progress">
                  <div style="position: absolute;top:50%;left:50%;margin-top: -62px;margin-left: -97px;">
                    <Loading />
                    <span style="color: #fff;text-align: center">Güncel Datalar Yükleniyor...</span>
                  </div>
                </template>
                <v-row>
                  <v-col class="ml-2">
                    <h3 class="white--text">
                      ₺{{ balanceNow | turkishCurrencyformat }}
                    </h3>
                  </v-col>
                  <v-col
                    class="ml-2"
                    :set="
                      (change =
                        userBalanceList[0]['data'][
                          userBalanceList[0]['data'].length - 1
                        ][1] - userBalanceList[0]['data'][0][1])
                    "
                  >
                    <h4 :class="change >= 0 ? 'green--text' : 'red--text'">
                      {{ change | signint }}
                    </h4>
                  </v-col>
                  <v-col
                    class="ml-0"
                    :set="
                      (yuzde =
                        (change / userBalanceList[0]['data'][0][1]) * 100)
                    "
                  >
                    <h4 :class="change >= 0 ? 'green--text' : 'red--text'">
                      {{ yuzde | signint }}%
                    </h4>
                  </v-col>
                  <v-col class="time-dropdown">
                    <v-select
                      style="margin-top: -10px;font-size:14px;background: transparent;"
                      :items="timeOptions"
                      item-text="text"
                      item-value="time"
                      solo
                      dense
                      dark
                      v-model="time"
                      :value="select"
                      @change="setChart"
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <apexchart
                  ref="realtimeChart"
                  class="ma-0 pa-0 balanceGraph"
                  type="line"
                  height="330"
                  :options="chartOptions"
                  :series="userBalanceList"
                ></apexchart>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card style="background: transparent;" :loading="loading2">
                <template slot="progress">
                  <div style="position: absolute;top:50%;left:50%;margin-top: -62px;margin-left: -97px;">
                    <Loading />
                    <span style="color: #fff;text-align: center">Güncel Datalar Yükleniyor...</span>
                  </div>
                </template>
                <v-data-table
                  :headers="headers"
                  :items="data"
                  dense
                  mobile-breakpoint="0"
                  hide-default-footer
                  :items-per-page="itemPerPage"
                  no-data-text=""
                  style="border: 1px solid #ddd;border-radius:6px;"
                  :dark="!$store.state.isLight"
                  :light="$store.state.isLight"
                  sort-by.sync="amount"
                  loading="true"
                >
                  <template v-slot:item="{ item }">
                    <tr @click="props.expanded = !props.expanded">
                      <td style="font-size: 11px;">
                        {{ item.shortName | uppercase }}
                      </td>
                      <td style="font-size: 11px;">
                        {{
                          (allPrices[item.shortName] ||
                            allPrices[shortToName[item.shortName]])
                            | turkishCurrencyformat
                        }}
                      </td>
                      <td style="font-size: 11px;">
                        {{ item.amount | tofixedftwo }}
                      </td>
                      <td style="font-size: 11px;">
                        <div v-if="item.shortName != 'TRY'">
                          <span
                            :class="[
                              parseFloat(
                                (allPrices[item.shortName] ||
                                  allPrices[shortToName[item.shortName]]) *
                                  item.amount
                              ) -
                                parseFloat(item.cost) >=
                              0
                                ? 'green--text'
                                : 'red--text'
                            ]"
                          >
                            {{
                              (parseFloat(
                                (allPrices[item.shortName] ||
                                  allPrices[shortToName[item.shortName]]) *
                                  item.amount
                              ) -
                                parseFloat(item.cost))
                                | signint
                            }}
                          </span>
                        </div>
                        <div v-else>-</div>
                      </td>
                      <td style="font-size: 11px;">
                        {{
                          ((allPrices[item.shortName] ||
                            allPrices[shortToName[item.shortName]]) *
                            item.amount)
                            | turkishCurrencyformat
                        }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card style="background: transparent;" :loading="loading3">
                <template slot="progress">
                  <div style="position: absolute;top:50%;left:50%;margin-top: -62px;margin-left: -97px;">
                    <Loading />
                    <span style="color: #fff;text-align: center">Güncel Datalar Yükleniyor...</span>
                  </div>
                </template>
                <v-data-table
                  :headers="orderHeaders"
                  :items="orders"
                  dense
                  mobile-breakpoint="0"
                  hide-default-footer
                  :items-per-page="itemPerPage"
                  item-class="text--white"
                  item-key="id"
                  no-data-text="Henüz herhangi bir emir vermediniz."
                  fixed-header
                  style="border: 1px solid #ddd;border-radius:6px;"
                  :style="[
                    $store.state.isLight
                      ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
                      : 'color:#ffffff !important;background-color:rgba(0,0,0,.3);'
                  ]"
                  :dark="!$store.state.isLight"
                  :light="$store.state.isLight"
                  height="340"
                  :expanded.sync="expanded"
                  :show-expand="$vuetify.breakpoint.smAndDown"
                  single-expand
                >
                  <template v-slot:item="{ item, expand, isExpanded }">
                    <tr>
                      <td
                        style="font-size: 10px;"
                        :class="{ 'black--text': $store.state.isLight }"
                      >
                        <v-row class="align-center">
                          <v-avatar size="28" class="ml-2 mr-2">
                            <img
                              :src="
                                allImages[item.CoinOrCurrency] ||
                                  $store.state.api + '/gold.png'
                              "
                              alt=""
                            />
                          </v-avatar>
                          <div class="d-flex flex-column">
                            <span>{{ item.CoinOrCurrency }}</span>
                            <span v-if="item.buyOrSell == 'buy'">ALIŞ</span>
                            <span v-else>SATIŞ</span>
                          </div>
                        </v-row>
                      </td>
                      <td
                        :class="{ 'black--text': $store.state.isLight }"
                        style="font-size: 10px;"
                      >
                        <div>
                          {{ item.buyOrSell == "buy" ? "+" : "-" }}
                          {{ item.Amount }}
                        </div>
                      </td>
                      <td style="font-size: 11px;" v-if="!$vuetify.breakpoint.smAndDown">
                            <div class="d-flex flex-column">
                              <span v-text="item.OrderType == 'time' ? 'Tarihe Göre' : 'Fiyata Göre'"></span>
                              <span style="font-size: 11px;" v-if="item.OrderType == 'time'">{{ (item.Parameter.indexOf('z') > 0 ? new Date(item.Parameter).toLocaleString('tr') : new Date(item.createdAt).toLocaleDateString() )}}</span>
                              <span v-else>{{item.Parameter}}</span>
                            </div>
                      </td>
                      <td>
                        <v-btn
                          style="border: 1px solid #eee;"
                          icon
                          x-small
                          color="transparent"
                          tile
                          @click="
                            buySellNow(
                              item.id,
                              item.buyOrSell,
                              item.CoinOrCurrency,
                              item.Amount
                            )
                          "
                          :disabled="item.Closed == 1 || item.Closed == -1"
                        >
                          <v-icon
                            size="16"
                            :color="
                              item.Closed != 0
                                ? 'rgba(255,255,255,0.5)'
                                : 'green'
                            "
                          >
                            mdi-check-outline
                          </v-icon>
                        </v-btn>

                        <v-btn
                          style="border: 1px solid #eee;"
                          icon
                          tile
                          :disabled="item.Closed == 1 || item.Closed == -1"
                          x-small
                          color="transparent"
                          @click="deleteOrder(item.id)"
                        >
                          <v-icon
                            size="16"
                            :color="
                              !item.Closed != 0
                                ? 'rgba(255,255,255,0.5)'
                                : 'red'
                            "
                          >
                            mdi-close-outline
                          </v-icon>
                        </v-btn>
                      </td>
                      <td style="font-size: 11px;" v-if="!$vuetify.breakpoint.smAndDown">
                            <div v-if="item.Closed == 1">
                              <span class="green--text">GERÇEKLEŞTİ</span>
                            </div>
                            <div v-else-if="item.Closed == -1">
                              <span class="yellow--text">İPTAL EDİLDİ</span>
                            </div>
                            <div v-else>
                              <span class="red--text">BEKLİYOR</span>
                            </div>
                      </td>
                      <td v-if="!$vuetify.breakpoint.smAndDown">
                        <span
                            style="font-size: 11px;"
                        >
                          {{ item.createdAt | dateStandartFormat }}
                        </span>
                      </td>
                      <td style="font-size: 11px;" v-if="$vuetify.breakpoint.smAndDown">
                        <v-btn icon @click="expand(!isExpanded)">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }" v-if="$vuetify.breakpoint.smAndDown">
                    <td :colspan="headers.length" style="font-size: 11px;">
                      <v-row class="justify-start pl-2">
                        <v-col class="text-left">
                          <span>Zaman:</span>
                          {{ item.createdAt | dateStandartFormat }}
                        </v-col>
                        <v-col class="d-flex flex-row">
                          <span>Tip:</span>
                          <span
                            v-text="
                              item.OrderType == 'time'
                                ? 'Tarihe Göre'
                                : 'Fiyata Göre'
                            "
                          ></span>
                          <span
                            style="font-size: 11px;"
                            v-if="item.OrderType == 'time'"
                            >{{
                              item.Parameter.indexOf("z") > 0
                                ? new Date(item.Parameter).toLocaleString("tr")
                                : new Date(item.createdAt).toLocaleDateString()
                            }}</span
                          >
                          <span v-else>{{ item.Parameter }}</span>
                        </v-col>
                        <v-col>
                          <div v-if="item.Closed == 1">
                            <span class="green&#45;&#45;text">GERÇEKLEŞTİ</span>
                          </div>
                          <div v-else-if="item.Closed == -1">
                            <span class="yellow&#45;&#45;text"
                              >İPTAL EDİLDİ</span
                            >
                          </div>
                          <div v-else>
                            <span class="red&#45;&#45;text">BEKLİYOR</span>
                          </div>
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card style="background: transparent;" :loading="loading4">
                <template slot="progress">
                  <div style="position: absolute;top:50%;left:50%;margin-top: -62px;margin-left: -97px;">
                    <Loading />
                    <span style="color: #fff;text-align: center">Güncel Datalar Yükleniyor...</span>
                  </div>
                </template>
                <v-data-table
                  :headers="topUserHeaders"
                  :items="topUsers"
                  dense
                  mobile-breakpoint="0"
                  hide-default-footer
                  :items-per-page="itemPerPage"
                  item-class="text--white"
                  style="border: 1px solid #ddd;border-radius:6px;"
                  :dark="!$store.state.isLight"
                  :light="$store.state.isLight"
                >
                  <template v-slot:item="{ item }">
                    <tr
                      :style="
                        $vuetify.breakpoint.smAndDown
                          ? 'height: 50px;vertical-align: baseline;'
                          : ''
                      "
                    >
                      <td style="font-size: 10px;">
                        <v-row class="align-center">
                          <span
                            class="ml-4 mr-4"
                            v-html="
                              +item.sirano < 4
                                ? item.sirano + '*'
                                : item.sirano + '&nbsp;&nbsp;'
                            "
                          ></span>
                          <v-avatar
                            size="32"
                            class="ml-2 mr-2"
                            v-if="
                              item.profileImage == '' ||
                                item.profileImage.length == 4
                            "
                          >
                            <img
                              :src="
                                $store.state.api +
                                  '/defaultuserprofileimage.png'
                              "
                              alt=""
                            />
                          </v-avatar>
                          <v-avatar size="32" class="ml-2 mr-2" v-else>
                            <img
                              :src="
                                item.profileImage.indexOf('googleusercontent') >
                                -1
                                  ? item.profileImage
                                  : item.profileImage.indexOf('avatars') > -1
                                  ? item.profileImage
                                  : $store.state.api +
                                    '/uploads/' +
                                    item.profileImage
                              "
                              alt=""
                            />
                          </v-avatar>
                          <span
                            style="max-width: 110px;"
                            class="text-truncate"
                            >{{ item.fullName | tocapitalize }}</span
                          >
                        </v-row>
                      </td>
                      <td style="font-size: 10px;">
                        ₺{{ item.balanceNow | turkishCurrencyformat }}
                      </td>
                      <td v-if="!$vuetify.breakpoint.smAndDown">
                        <v-row
                          class="pa-0"
                          :style="
                            'width:' +
                              (116 +
                                (item.balanceNow / topUsers[0]['balanceNow']) *
                                  100 ) +
                              'px;'
                          "
                          @click="displayDetails(item.wallet)"
                        >
                          <v-tooltip top color="#ff3366">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="font-size:10px;background: #DC143C;height: 16px;"
                                class="text-center"
                                :style="
                                  'width:' + Object.values(item.graph)[0] + '%;'
                                "
                                v-bind="attrs"
                                v-on="on"
                              ></span>
                            </template>
                            <span
                              >{{ Object.keys(item.graph)[0] | tocapitalize }} :
                              {{
                                Object.values(item.graph)[0].toFixed(2) + "%"
                              }}</span
                            >
                          </v-tooltip>
                          <v-tooltip top color="#228B22">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="font-size:10px;background: #228B22;height: 16px;"
                                class="text-center"
                                v-if="
                                  Object.keys(item.graph)[1] != 'undefined' ||
                                    Object.values(item.graph)[1] != 0
                                "
                                :style="
                                  'width:' + Object.values(item.graph)[1] + '%;'
                                "
                                v-bind="attrs"
                                v-on="on"
                              ></span>
                            </template>
                            <span
                              >{{ Object.keys(item.graph)[1] | tocapitalize }} :
                              {{
                                Object.values(item.graph)[1].toFixed(2) + "%"
                              }}</span
                            >
                          </v-tooltip>
                          <v-tooltip top color="#778899">
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                style="font-size:10px;background: #778899;height: 16px;"
                                class="text-center"
                                v-if="
                                  item.graph['diger'] != null &&
                                    item.graph['diger'] != 0 &&
                                    item.graph['diger'] != undefined &&
                                    item.graph['diger'] > 10
                                "
                                :style="'width:' + item.graph['diger'] + '%;'"
                                v-bind="attrs"
                                v-on="on"
                              ></span>
                            </template>
                            <span
                              >DİĞER :
                              {{ item.graph["diger"].toFixed(2) + "%" }}</span
                            >
                          </v-tooltip>
                        </v-row>
                      </td>
                      <v-row
                        class="pa-0"
                        v-if="$vuetify.breakpoint.smAndDown"
                        style="position: absolute;left: 13px;right: 13px;"
                        :style="
                          'width:' +
                            (19.3 +
                              (item.balanceNow / topUsers[0]['balanceNow']) *
                                80) +
                            '%;' +
                            'top:' +
                            (67 + (item.sirano - 1) * 50) +
                            'px;'
                        "
                        @click="displayDetails(item.wallet)"
                      >
                        <v-tooltip top color="#ff3366">
                          <template v-slot:activator="{ on, attrs }">
                            <span
                              style="font-size:10px;background: #DC143C;height: 16px;"
                              class="text-center"
                              :style="
                                'width:' + Object.values(item.graph)[0] + '%;'
                              "
                              v-bind="attrs"
                              v-on="on"
                            ></span>
                          </template>
                          <span
                            >{{ Object.keys(item.graph)[0] | tocapitalize }} :
                            {{
                              Object.values(item.graph)[0].toFixed(2) + "%"
                            }}</span
                          >
                        </v-tooltip>
                        <v-tooltip top color="#228B22">
                          <template v-slot:activator="{ on, attrs }">
                            <span
                              style="font-size:10px;background: #228B22;height: 16px;"
                              class="text-center"
                              v-if="
                                Object.keys(item.graph)[1] != 'undefined' ||
                                  Object.values(item.graph)[1] != 0
                              "
                              :style="
                                'width:' + Object.values(item.graph)[1] + '%;'
                              "
                              v-bind="attrs"
                              v-on="on"
                            ></span>
                          </template>
                          <span
                            >{{ Object.keys(item.graph)[1] | tocapitalize }} :
                            {{
                              Object.values(item.graph)[1].toFixed(2) + "%"
                            }}</span
                          >
                        </v-tooltip>
                        <v-tooltip top color="#778899">
                          <template v-slot:activator="{ on, attrs }">
                            <span
                              style="font-size:10px;background: #778899;height: 16px;"
                              class="text-center"
                              v-if="
                                item.graph['diger'] != null &&
                                  item.graph['diger'] != 0 &&
                                  item.graph['diger'] != undefined &&
                                  item.graph['diger'] > 10
                              "
                              :style="'width:' + item.graph['diger'] + '%;'"
                              v-bind="attrs"
                              v-on="on"
                            ></span>
                          </template>
                          <span
                            >DİĞER :
                            {{ item.graph["diger"].toFixed(2) + "%" }}</span
                          >
                        </v-tooltip>

                        <!--                          <span style="font-size:10px;background: #DC143C;" class="text-center" :style="'width:'+Object.values(item.graph)[0]+'%;'">{{ Object.keys(item.graph)[0] | tocapitalize }}</span>
                          <span style="font-size:10px;background: #228B22;" class="text-center" v-if="Object.keys(item.graph)[1] != 'undefined' || Object.values(item.graph)[1] != 0" :style="'width:'+Object.values(item.graph)[1]+'%;'">{{ Object.keys(item.graph)[1] | tocapitalize }}</span>
                          <span style="font-size:10px;background: #778899;" class="text-center" v-if="item.graph['diger']!=0 && item.graph['diger']!=undefined && item.graph['diger']>10" :style="'width:'+item.graph['diger']+'%;'">DİĞER</span>-->
                      </v-row>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <v-dialog
      v-model="detailsDialog"
      max-width="400"
      class="pa-2"
      content-class="details-dialog"
      style="height:60%;"
    >
      <v-container
        style="border: 1px solid #ddd;border-radius:0;position:relative;height: 100%;"
      >
        <apexchart
          type="donut"
          :options="detailsChartOptions"
          :series="detailsSeries"
        ></apexchart>
      </v-container>
    </v-dialog>
    <IsEmailSendingModal />
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import { mapState } from "vuex";
import { setGraph } from "@/functions";
import shortNames from "@/assets/shortname-convert";
import allImages from "@/assets/allimages";
import shortToName from "@/assets/short-to-name.json";
import moment from "moment";
import _ from "lodash";
import IsEmailSendingModal from "@/components/common/EmailSending";
import EventBus from "../event-bus";
import Loading from "@/components/Loading";
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center"
};
let alertoptions = {
  type: "error",
  icon: "error",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "red accent-3 text-center",
  className: "text-center"
}
export default {
  name: "UserWallet",
  data(app) {
    return {
      sharing: {
        url: 'https://para.guru',
        title: 'Sanal Para ile emtia ve kripto dünyasında yerini al.',
        description: '',
        quote: 'Sanal Para ile emtia ve kripto dünyasında yerini al.',
        hashtags: 'para.guru,bitcoin,gurucoin',
        twitterUser: 'wwwparaguru'
      },
      networks: [
        { network: 'reddit', name: 'Reddit', icon: 'mdi-reddit', color: '#ff4500' },
        { network: 'twitter', name: 'Twitter', icon: 'mdi-twitter', color: '#1da1f2' },
        { network: 'telegram', name: 'Telegram', icon: 'mdi-send-outline', color: '#0088cc' },
        { network: 'facebook', name: 'Facebook', icon: 'mdi-facebook', color: '#1877f2' },
      ],
      i: 1,
      userBalanceList: [
        {
          data: [1, 2, 3, 4, 56, 8]
        }
      ],
      timeOptions: [
        { text: "Haftalık", time: 7 },
        { text: "Aylık", time: 30 },
        { text: "Yıllık", time: 999 }
      ],
      time: 999,
      select: { text: "Haftalık", time: 7 },
      chartOptions: {
        chart: {
          type: "area",
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            },
            autoSelected: "zoom"
          },
          locales: [
            {
              name: "en",
              options: {
                months: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık"
                ],
                shortMonths: [
                  "Oca",
                  "Şub",
                  "Mar",
                  "Nis",
                  "May",
                  "Haz",
                  "Tem",
                  "Agu",
                  "Eyl",
                  "Eki",
                  "Kas",
                  "Ara"
                ],
                days: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
                shortDays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
              }
            }
          ],
          xaxis: {
            categories: []
          }
        },
        stroke: {
          width: 2,
          colors: ["#ff3064"],
          curve: "smooth"
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 6,
          colors: ["#ff3064"],
          strokeColors: "#fff",
          strokeWidth: 1,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        title: {
          align: "left"
        },
        yaxis: {
          labels: {
            style: {
              colors: app.$store.state.isLight ? "#000" : "#ffffff"
            }
          },
          axisTicks: {
            show: false,
            color: app.$store.state.isLight ? "#000" : "#ffffff",
            width: 0
          },
          axisBorder: {
            color: app.$store.state.isLight ? "#000" : "#ffffff"
          }
        },
        xaxis: {
          type: "datetime",
          tickAmount: 6,
          labels: {
            style: {
              colors: app.$store.state.isLight ? "#000" : "#ffffff"
            },
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dddd",
              hour: ""
            },
            datetimeUTC: false
          },
          axisTicks: {
            color: app.$store.state.isLight ? "#000" : "#ffffff"
          },
          axisBorder: {
            color: app.$store.state.isLight ? "#000" : "#ffffff"
          }
        },
        tooltip: {
          shared: true,
          y: {
            formatter: function(val) {
              return val + " $";
            }
          },
          x: {
            format: "dd  MMM yyyy HH:mm:ss",
            formatter: function(val) {
              return new Date(val).toLocaleDateString();
            }
          },
          custom: function({ series, seriesIndex, dataPointIndex /*,w*/ }) {
            return (
              '<div class="arrow_box tooltipp">' +
              '<span style="font-weight: 600;">' +
              "₺" +
              series[seriesIndex][dataPointIndex] +
              "</span><br>" +
              "</div>"
            );
          }
        },
        grid: {
          show: true,
          borderColor: "rgba(255,255,255,.4)",
          strokeDashArray: 1,
          position: "back",
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          row: {
            colors: undefined,
            opacity: 0.5
          },
          column: {
            colors: undefined,
            opacity: 0.5
          },
          padding: {
            top: 0,
            right: 20,
            bottom: 0,
            left: 20
          }
        }
      },
      data: [],
      allUnits: [],
      menu: false,
      dolar: 1,
      itemPerPage: 100,
      avaibleBalance: 0,
      balance: 0,
      balanceNow: 0,
      orderHeaders: [
        {
          text: "EMİRLERİM",
          sortable: false,
          value: "CoinOrCurrency",
          width: "104px",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "MİKTAR",
          value: "Parameter",
          sortable: false,
          width: "32px",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption text-center"
        },
        {
          text: "TİP",
          value: "buyOrSell",
          sortable: false,
          width: "120px",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption",
        },
        {
          text: "",
          value: "buyOrSell",
          sortable: false,
          width: "80px",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "DURUM",
          value: "Closed",
          sortable: false,
          width: "50px",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption",
        },
        {
          text: "TARİH/SAAT",
          value: "createdAt",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption",
          align: "end"
        },
        { text: "", value: "data-table-expand", align: "end" }
      ],
      headers: [
        {
          text: "CÜZDANIM",
          align: "start",
          sortable: false,
          value: "shortName",
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "FİYAT",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "MİKTAR",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "KAR/ZARAR",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        },
        {
          text: "TOPLAM",
          value: "amount",
          sortable: false,
          class: this.$store.state.isLight
            ? "pinkk caption"
            : "amber--text accent-3 caption"
        }
      ],
      topUserHeaders: [
        {
          text: "EN İYİ OYUNCULAR",
          align: "start",
          sortable: false,
          value: "fullName",
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption",
          width: !app.$vuetify.breakpoint.smAndDown ? "210px" : "auto"
        },
        {
          text: "BAKİYE",
          value: "balanceNow",
          sortable: false,
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption",
          width: "130px"
        },
        {
          text: "PORTFÖY",
          value: "graph",
          sortable: false,
          class: this.$store.state.isLight
              ? "pinkk caption"
              : "amber--text accent-3 caption"
        }
      ],
      walletLoaded: false,
      orders: [],
      topUsers: [],
      allPrices: JSON.parse(localStorage.getItem("allprices")),
      shortNames: shortNames,
      allImages: allImages,
      shortToName: shortToName,
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      detailsChartOptions: {
        labels: [],
        chart: {
          type: "donut",
          foreColor: "#fff"
        },
        legend: {
          position: "bottom",
          floating: true,
          markers: {
            radius: 0
          },
          itemMargin: {
            horizontal: 4,
            vertical: 0
          },
          offsetY: 10
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val.toFixed(2) + " ₺";
            }
          },
          style: {
            borderRadius: 10
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient"
        },
        title: {
          text: ""
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {},
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      },
      detailsSeries: [],
      detailsDialog: false,
      detailsLabels: [],
      isExpanded: false,
      expanded: [],
    };
  },
  components: {
    IsEmailSendingModal,
    Loading
  },
  created() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.orderHeaders.splice(2,1);
      this.orderHeaders.splice(3,1);
      this.orderHeaders.splice(3,1);
      this.chartOptions.responsive = [
        {
          breakpoint: 768,
          options: {
            xaxis: {
              axisTicks: {
                show: false,
                color: "#ff0000"
              }
            },
            yaxis: {
              axisTicks: {
                show: false
              },
              labels: {
                show: false
              }
            }
          }
        }
      ];
      this.topUserHeaders.pop();
    }else{
      this.orderHeaders.pop()
    }
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("allprices", fetchedData => {
      localStorage.setItem("allprices", JSON.stringify(fetchedData));
      app.allPrices = fetchedData;
    });

    if (localStorage.getItem("user")) {
      this.getUserWallet();
      this.getUserAllOrders();
      this.getTopUsers();
    }
    axios
      .post(`${this.$store.state.api}/getuserbalancelist`, {
        id: JSON.parse(localStorage.getItem("user")).id
      })
      .then(response => {
        //app.balanceNow = response.data[new Date(new Date().toDateString())];
        app.balanceNow = Object.values(response.data).pop();
        app.userBalanceList = [
          {
            data: Object.values(response.data)
          }
        ];
        let tempValues = [];
        for (const key in response.data) {
          tempValues.push([key, response.data[key]]);
        }
        this.userBalanceList = [
          {
            data: tempValues
          }
        ];
        this.loading1 = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    const app = this;
    EventBus.$on("boughtorsold", function() {
      app.getUserWallet();
      app.getUserAllOrders();
      app.getTopUsers();
    });
  },
  methods: {
    getUserWallet: function() {
      this.loading2 = true;
      this.balance = 0;
      axios
        .post(`${this.$store.state.api}/getuserwallet`, {
          id: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          localStorage.setItem("wallet", JSON.stringify(response.data));
          let data = Object.values(response.data);
          let temp = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].amount > 0) {
              temp.push(data[i]);
            }
          }
          this.data = temp;
          this.loading2 = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserAllOrders: function() {
      this.walletLoaded = false;
      axios
        .post(`${this.$store.state.api}/getallorder`, {
          userId: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          this.orders = response.data;
          this.loading3 = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTopUsers: function() {
      axios
        .get(`${this.$store.state.api}/gettopusers`)
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].graph = null;
            response.data[i].graph = setGraph(
              response.data[i]["wallet"],
              JSON.parse(localStorage.getItem("allprices"))
            );
          }
          this.topUsers = response.data;
          this.loading4 = false;
        })
        .catch(err => {
          this.$toasted.show(`${err}`, alertoptions);
        });
    },
    displayDetails(details) {
      let temp = Object.values(details).filter(current => {
        return current.amount > 0;
      });
      let series = [];
      let label = [];
      this.detailsSeries = [];
      this.detailsChartOptions.labels = [];
      for (let i = 0; i < temp.length; i++) {
        series.push(
          temp[i].amount *
            (this.allPrices[temp[i].shortName] ||
              this.allPrices[shortToName[temp[i].shortName]])
        );
        try {
          label.push(temp[i].shortName.toUpperCase().replaceAll("-", " "));
        } catch (e) {
          label.push(temp[i].shortName.toUpperCase());
        }
      }
      this.detailsDialog = true;
      this.detailsSeries = series;
      this.detailsChartOptions = {
        labels: label,
        chart: {
          width: "100%",
          height: "auto",
          type: "donut",
          foreColor: "#fff"
        },
        legend: {
          position: "bottom",
          floating: true,
          markers: {
            radius: 0
          },
          itemMargin: {
            horizontal: 4,
            vertical: 0
          },
          offsetY: 40
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
            size: 100
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val.toFixed(2) + " ₺";
            }
          },
          style: {
            borderRadius: 10
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: "gradient"
        },
        title: {
          text: ""
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%"
              },
              legend: {
                position: "bottom",
                offsetY: 5
              }
            }
          }
        ]
      };
    },
    deleteOrder(orderId) {
      axios
        .post(`${this.$store.state.api}/deleteorder`, {
          orderId: orderId
        })
        .then(() => {
          this.$toasted.show(`Emir iptal edildi.`, options);
          this.getUserAllOrders();
        })
        .catch(err => {
          console.log(err);
        });
    },
    buySellNow(orderId, buyOrSell, coinOrCurrency, amount) {
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      this.$toasted.show(
        buyOrSell == "buy" ? `Alım emriniz alındı.` : `Satım emriniz alındı.`,
        options
      );
      axios
        .post(`${this.$store.state.api}/buysellnow`, {
          orderId: orderId,
          buyOrSell: buyOrSell,
          userId: JSON.parse(localStorage.getItem("user")).id,
          coinOrCurrency: coinOrCurrency,
          amount: amount
        })
        .then(() => {
          this.emirLoaded = true;
          this.getUserWallet();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setChart() {
      axios
        .post(`${this.$store.state.api}/getuserbalancelist`, {
          id: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          let tempValues = [];
          _.forEach(response.data, (v, k) => {
            if (moment().subtract(this.time, "d") < moment(k)) {
              tempValues.push([k, v]);
            }
          });
          this.userBalanceList = [
            {
              data: tempValues
            }
          ];
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendActivationCode() {
      this.$store.commit("isEmailSending", true);
      axios
        .post(`${this.$store.state.api}/sendactivation`, {
          userId: this.$store.state.userinfo.id,
          email: this.$store.state.userinfo.email
        })
        .then(response => {
          if (response.data == "MAILOK") {
            this.$store.commit("isEmailSending", false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickRow(item, event) {
      console.log(item);
      if (event.isExpanded) {
        const index = this.expanded.findIndex(i => i === item);
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(item);
      }
    }
  },
  computed: mapState({
    userwalletdialog: state => state.userwalletdialog,
    userinfo: state => state.userinfo
  })
};
</script>
<style>
.tooltipp {
  padding: 0px 20px;
  background: #ff3366;
  color: #ffffff;
  border-radius: 9px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 3px rgba(56, 54, 54, 0.86);
}
.v-card__progress {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
}
.time-dropdown
  .theme--dark.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  background: transparent;
}
.time-dropdown
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
}
.time-dropdown .v-select.v-input--dense .v-select__selection--comma {
  margin: 5px 4px 0px 0;
}
.time-dropdown .v-select__slot {
  border-bottom: 1px solid #fff;
}
.balanceGraph .apexcharts-tooltip.apexcharts-theme-light {
  background: transparent !important;
  border: none !important;
}
.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > th {
  background: transparent !important;
}
.v-dialog.details-dialog {
  background-color: rgba(11, 14, 63, 0.88) !important;
  height: 60%;
}
.details-dialog foreignObject,
.details-dialog svg,
.details-dialog .apexcharts-canvas {
  height: 280px !important;
}
.details-dialog foreignObject,
.details-dialog svg {
  overflow: visible !important;
}
</style>
<style scoped>
.apexcharts-tooltip {
  background: transparent !important;
  color: #fff;
  overflow: visible !important;
  border: none !important;
}
.apexcharts-tooltip-series-group.apexcharts-active {
  background-color: #ff3366 !important;
}
</style>

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
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: transparent !important;
  color: #fff !important;
}
</style>
