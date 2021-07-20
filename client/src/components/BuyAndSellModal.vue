<template>
  <v-container>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="700"
      style="border-radius:0 !important;"
      v-model="$store.state.buyselldialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-container
        style="border: 1px solid #ddd;border-radius:0;position:relative;"
        :style="
          $store.state.isLight
            ? 'background-color:#f9f9f9;'
            : 'background-color:rgba(11,14,63,0.8);'
        "
      >
        <div class="pa-4">
          <v-btn
            icon
            dark
            @click="$store.commit('buyselldialog')"
            style="position:absolute;right:10px;top:10px;"
          >
            <v-icon :color="$store.state.isLight ? 'black' : 'white'"
              >mdi-close</v-icon
            >
          </v-btn>
          <div>
            <v-row>
              <v-avatar size="40">
                <img :src="currentUnit.image" />
              </v-avatar>
              <!-- Al sat seçenekleri -->
              <v-combobox
                :color="$store.state.isLight ? 'black' : 'white'"
                :dark="!$store.state.isLight"
                :items="data"
                v-model="currentUnit"
                append-icon=""
                class="text-center mt-0 pt-0 ml-2"
                append-outer-icon="mdi-card-search-outline"
                @change="chooseUnit"
                item-text="name"
              ></v-combobox>
            </v-row>
            <v-row>
              <v-col class="d-flex flex-row justify-space-evenly">
                <div v-if="currentUnit.isMajor" :class="$vuetify.breakpoint.smAndDown ? 'd-flex flex-row justify-space-between' : 'float-left'">
                  <span
                    :class="$store.state.isLight ? '' : 'white--text'"
                    class="ml-8"
                    >₺ {{ currentUnit.price | binayracveondalik }}</span>
                </div>
                <div v-else>
                  <span :class="$store.state.isLight ? '' : 'white--text'"
                    >$ {{ currentUnit.price }}</span>
                  <span
                      class="ml-9"
                    :class="$store.state.isLight ? '' : 'white--text'"
                    >₺
                    {{ (currentUnit.price * $store.state.dolar) | binayracveondalik }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div style="border-top:1px solid #ddd;">
          <v-tabs
            v-model="tab"
            background-color="transparent"
            :right="!$vuetify.breakpoint.smAndDown"
            :centered="$vuetify.breakpoint.smAndDown"
            color="pink"
            height="30"
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :class="$store.state.isLight ? '' : 'white--text'"
              class="text-lowercase"
              style="text-transform: capitalize !important;"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-container
                fluid
                :style="
                  $store.state.isLight
                    ? 'background-color:#f9f9f9;'
                    : 'background-color:rgba(11,14,63,0.1);'+
                    $vuetify.breakpoint.smAndDown ? 'height:auto;' : 'height:240px;'
                "
                style="border-radius: 0;"
              >
                <v-row style="margin-top: 20px;" :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : 'flex-row'">
                  <v-col class="pb-0 pt-0" :cols="$vuetify.breakpoint.smAndDown ? 12 : 3">
                    <v-text-field
                      v-model="orderNowAmount"
                      type="number"
                      min="1"
                      :style="
                        'width:' + $vuetify.breakpoint.smAndDown
                          ? '60px'
                          : '80px'
                      "
                      style="padding: 0 16px !important;font-size: 12px;"
                      class="centered-input ml-6"
                      :dark="!$store.state.isLight"
                      :color="$store.state.isLight ? 'black' : 'white'"
                      placeholder="Miktarı Giriniz"
                      @input="calculateSum"
                    ></v-text-field>
                  </v-col>
                  <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 3" class="pb-0 pt-0">
                    <v-text-field
                      v-if="currentUnit.isMajor"
                      :style="
                        'width:' + $vuetify.breakpoint.smAndDown
                          ? '60px'
                          : '80px'
                      "
                      style="padding: 0 16px !important;font-size: 12px;"
                      class="centered-input ml-6"
                      :dark="!$store.state.isLight"
                      :color="$store.state.isLight ? 'black' : 'white'"
                      placeholder="0,00"
                      v-model="currentUnit.price"
                      readonly
                      @input="calculateSum"
                    >
                    </v-text-field>

                    <v-text-field
                      v-else
                      :style="
                        'width:' + $vuetify.breakpoint.smAndDown
                          ? '60px'
                          : '80px'
                      "
                      style="padding: 0 16px !important;font-size: 12px;"
                      class="centered-input ml-6"
                      :dark="!$store.state.isLight"
                      :color="$store.state.isLight ? 'black' : 'white'"
                      placeholder="0,00"
                      v-model="currentUnitTLPrice"
                      readonly
                      @input="calculateSum"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1" class="text-center pb-0 pt-0 ma-0" :class="$vuetify.breakpoint.smAndDown ? 'mx-auto' : ''">
                    <v-icon
                      size="40"
                      :color="$store.state.isLight ? '#ff3366' : '#ffbf00'"
                      class="mt-1"
                      :class="
                        $vuetify.breakpoint.smAndDown ? 'mdi-rotate-90' : ''
                      "
                    >
                      mdi-arrow-right
                    </v-icon>
                  </v-col>
                  <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 3" class="pb-0 pt-0">
                    <v-text-field
                      :color="$store.state.isLight ? 'black' : 'white'"
                      class="ml-6 centered-input"
                      :style="
                        'width:' + $vuetify.breakpoint.smAndDown
                          ? 'auto'
                          : '80px'
                      "
                      style="padding: 0 16px !important;font-size:12px !important;"
                      :dark="!$store.state.isLight"
                      readonly
                      placeholder="Toplam"
                      v-model="calculatedSum"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pa-0 ma-0" v-if="!$vuetify.breakpoint.smAndDown">
                    <v-btn icon style="background: transparent;">
                      <v-icon color="white">mdi-plus-box-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div
                  class="d-flex flex-row justify-lg-end alsat"
                  :style="$vuetify.breakpoint.smAndDown ? 'margin-top: 0;' : 'margin-top: 87px;'"
                >
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn
                      class="mt-6 pl-1"
                      tile
                      color="rgb(248, 73, 96)"
                      @click="sellOrderNow"
                      :disabled="!emirLoaded"
                    >
                      <v-icon
                        left
                        style="background-color: rgba(0,0,0,.1);height: 38px;"
                      >
                        mdi-arrow-down
                      </v-icon>
                      Sat
                    </v-btn>
                    <v-btn
                      class="mt-6 pl-1 ml-4"
                      tile
                      color="rgb(2, 192, 118)"
                      @click="buyOrderNow"
                      :disabled="!emirLoaded"
                    >
                      <v-icon
                        left
                        style="background-color: rgba(0,0,0,.1);height: 38px;"
                      >
                        mdi-arrow-up
                      </v-icon>
                      Al
                    </v-btn>
                  </div>
                </div>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container
                fluid
                :style="
                  $store.state.isLight
                    ? 'background-color:#f9f9f9;'
                    : 'background-color:rgba(0,0,0,0.1);' +
                    $vuetify.breakpoint.smAndDown ? 'height:auto;' : 'height:240px;'
                "
                style="border-radius: 0;"
              >
                <v-radio-group v-model="chosen">
                  <v-radio value="price" color="#ff3366">
                    <template v-slot:label>
                      <div
                        :class="$store.state.isLight ? '' : 'white--text'"
                        style="width: 100%;align-items: center;justify-content: space-between;"
                        :style="
                          chosen == 'price'
                            ? ''
                            : 'opacity:0.3;pointer-events: none;'
                        "
                        class="d-flex flex-row"
                      >
                        <div>Fiyata Göre</div>
                        <div class="d-flex" :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : 'flex-row'">
                          <v-text-field
                            type="number"
                            min="1"
                            v-model="amountByPrice"
                            :color="$store.state.isLight ? 'black' : 'white'"
                            class="ml-6 centered-input"
                            :style="
                              'width:' + $vuetify.breakpoint.smAndDown
                                ? 'auto'
                                : '80px'
                            "
                            style="padding: 0 16px !important;font-size:12px !important;"
                            :dark="!$store.state.isLight"
                            placeholder="Miktarı Giriniz"
                          ></v-text-field>
                          <v-text-field
                            v-model="price"
                            :color="$store.state.isLight ? 'black' : 'white'"
                            class="ml-6 centered-input"
                            :style="
                              'width:' + $vuetify.breakpoint.smAndDown
                                ? 'auto'
                                : '80px'
                            "
                            style="padding: 0 16px !important;font-size:12px !important;"
                            :dark="!$store.state.isLight"
                            placeholder="Fiyat Limitini Giriniz"
                          ></v-text-field>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="time" color="#ff3366">
                    <template v-slot:label>
                      <div
                        :class="$store.state.isLight ? '' : 'white--text'"
                        style="width: 100%;align-items: center;justify-content: space-between;"
                        :style="
                          chosen == 'time'
                            ? ''
                            : 'opacity:0.3;pointer-events: none;'
                        "
                        class="d-flex flex-row"
                      >
                        <div>Tarihe Göre</div>
                        <div class="d-flex" :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : 'flex-row'">
                          <v-text-field
                            type="number"
                            min="1"
                            v-model="amountByTime"
                            :color="$store.state.isLight ? 'black' : 'white'"
                            class="ml-6 centered-input"
                            :style="
                              'width:' + $vuetify.breakpoint.smAndDown
                                ? 'auto'
                                : '80px'
                            "
                            style="padding: 0 16px !important;font-size:12px !important;"
                            :dark="!$store.state.isLight"
                            placeholder="Miktarı Giriniz"
                          ></v-text-field>
                          <v-datetime-picker
                            v-model="time"
                            :date-picker-props="dateProps"
                            :time-picker-props="timeProps"
                            :text-field-props="inputProps"
                            clearText="TEMİZLE"
                            okText="TAMAM"
                            date-format="yyyy-MM-dd"
                            time-format="HH:mm"
                          >
                            <template slot="dateIcon">
                              <v-icon>mdi-calendar-month</v-icon>
                            </template>
                            <template slot="timeIcon">
                              <v-icon>mdi-clock-time-ten-outline</v-icon>
                            </template>
                          </v-datetime-picker>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
                <div class="d-flex flex-row justify-content-end alsat">
                  <v-spacer></v-spacer>
                  <div style="align-items:end;" class="text--white" :class="$vuetify.breakpoint.smAndDown ? 'mt-0' : 'mt-6'">
                    <v-btn
                      class="pl-1"
                      tile
                      color="rgb(248, 73, 96)"
                      @click="setSellOrder"
                      :disabled="!emirLoaded"
                    >
                      <v-icon
                        left
                        style="background-color: rgba(0,0,0,.1);height: 38px;"
                      >
                        mdi-arrow-down
                      </v-icon>
                      Sat
                    </v-btn>
                    <v-btn
                      class="pl-1 ml-4 text--white"
                      tile
                      color="rgb(2, 192, 118)"
                      @click="setBuyOrder"
                      :disabled="!emirLoaded"
                    >
                      <v-icon
                        left
                        color="white"
                        style="background-color: rgba(0,0,0,.1);height: 38px;"
                      >
                        mdi-arrow-up
                      </v-icon>
                      Al
                    </v-btn>
                  </div>
                </div>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import io from "socket.io-client";
import images from "../assets/images.js";
import "../../node_modules/material-icons/iconfont/material-icons.scss";
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
};
export default {
  name: "BuyAndSellModal",
  data: app => ({
    tab: null,
    image: "",
    items: ["Hemen Al", "Ödeme Emri"],
    chosen: "price",
    data: [],
    allUnits: [],
    images: [],
    currentUnit: "ABD DOLARI",
    currentUnitTLPrice: 1,
    time: new Date(),
    price: 0,
    amountByPrice: 0,
    amountByTime: 0,
    menu: false,
    priceNow: 20,
    dolar: 1,
    dateProps: {
      headerColor: "#1d2460",
      locale: "tr",
      min: new Date().toISOString().slice(0, 10)
    },
    timeProps: {
      headerColor: "#1d2460",
      useSeconds: false,
      ampmInTitle: false,
      locale: "tr",
      format: "24hr"
    },
    inputProps: {
      style: "padding: 0 16px !important;font-size:12px !important;margin-left:24px !important;",
      dark: !app.$store.state.isLight
    },
    orderNowAmount: 0,
    calculatedSum: 0,
    emirLoaded: true
  }),
  created() {
    let app = this;
    var socket = io.connect(`${this.$store.state.addr}`);
    socket.on("coins", fetchedData => {
      localStorage.setItem("coins250", JSON.stringify(fetchedData));
    });
    socket.on("golds", fetchedData => {
      localStorage.setItem("golds", JSON.stringify(fetchedData));
    });
    socket.on("currencies", fetchedData => {
      localStorage.setItem("currencies", JSON.stringify(fetchedData));
    });
    if (localStorage.getItem("coins250")) {
      this.data = JSON.parse(localStorage.getItem("coins250"));
      let tempList = JSON.parse(localStorage.getItem("currencies")).concat(
        JSON.parse(localStorage.getItem("golds"))
      );

      for (let i = 0; i < tempList.length; i++) {
        this.data.push({
          name: tempList[i]["type"],
          shortName: "",
          price: parseFloat(tempList[i]["Satış"].replace(",", ".")),
          image: images[tempList[i]["type"]] || this.$store.state.api + "/gold.png",
          isMajor: true
        });
      }
      this.allUnits = this.data.map(arr => {
        return arr["name"] + "-" + arr["shortName"].toUpperCase();
      });
    }

    socket.on("buy", fetchedData => {
      let prevId = -1;
      if (fetchedData.userId == JSON.parse(localStorage.getItem("user")).id || fetchedData.orderId != prevId) {
        this.$toasted.show(
          `${fetchedData.Amount} adet ${fetchedData.CoinOrCurrency} alım emriniz gerçekleşti.`,
          options
        );
        prevId = fetchedData.orderId;
        this.getUserWallet();
      }
    });

    socket.on("sell", fetchedData => {
      let prevId = -1;
      if (fetchedData.userId == JSON.parse(localStorage.getItem("user")).id || fetchedData.orderId != prevId) {
        this.$toasted.show(
          `${fetchedData.Amount} adet ${fetchedData.CoinOrCurrency} satım emriniz gerçekleşti.`,
          options
        );
        this.getUserWallet();
        prevId = fetchedData.orderId;
      }
    });

    setInterval(()=>{
      axios
          .get("https://finans.truncgil.com/today.json")
          .then(response => {
            app.dolar = parseFloat(response.data["USD"]["Satış"].replace(",", "."));
            this.currentUnit.price = this.currentUnit.price * 1;
            this.currentUnitTLPrice = (this.currentUnit.price * this.dolar).toFixed(2);
          })
          .catch(err => console.log(err));
    },5000)
    this.currentUnit = this.data[0];
    this.currentUnitTLPrice = (this.currentUnit.price * this.dolar).toFixed(2);
    this.chooseUnit();
  },
  methods: {
    chooseUnit() {
      this.image = this.currentUnit.image;
      this.currentUnitTLPrice =this.currentUnit["Tür"] == "Kripto" ? (this.currentUnit.price * this.dolar).toFixed(2) :(this.currentUnit.price);
      this.calculateSum();
    },
    calculateSum() {
      this.calculatedSum = (
        this.orderNowAmount * parseFloat(this.currentUnitTLPrice)
      );
    },
    setBuyOrder() {
      if (this.chosen == "time" && this.time < new Date()) {
        this.$toasted.show(`Geçmişe emir veremezsiniz.`, alertoptions);
        return;
      }
      if (
        (this.chosen == "price" ? this.amountByPrice : this.amountByTime) < 0.1
      ) {
        this.$toasted.show(`Miktar 0,1'den küçük olamaz.`, alertoptions);
        return;
      }
      let tl = JSON.parse(localStorage.getItem("user")).wallet["TÜRK LİRASI"];
      if (!tl > this.calculateSum) {
        this.$toasted.warn(`Yeterli TÜRK LİRASI yok.`, options);
        return;
      }
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      console.log(this.chosen == "price" ? this.amountByPrice : this.amountByTime,":Amount");
      axios
        .post(`${this.$store.state.api}/setbuyorder`, {
          userId: JSON.parse(localStorage.getItem("user")).id,
          orderType: this.chosen,
          parameter: this.chosen == "price" ? this.price : this.time,
          wealth: this.currentUnit["name"],
          amount:
            this.chosen == "price" ? this.amountByPrice : this.amountByTime,
          major: "TÜRK LİRASI"
        })
        .then(response => {
          this.emirLoaded = true;
          this.$toasted.show(`Emir oluşturuldu.`, options);
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setSellOrder() {
      if (this.chosen == "time" && this.time < new Date()) {
        this.$toasted.show(`Geçmişe emir veremezsiniz.`, alertoptions);
        return;
      }
      if (
        (this.chosen == "price" ? this.amountByPrice : this.amountByTime) < 0.1
      ) {
        this.$toasted.show(`Miktar 0,1'den küçük olamaz.`, alertoptions);
        return;
      }
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      axios
        .post(`${this.$store.state.api}/setsellorder`, {
          userId: JSON.parse(localStorage.getItem("user")).id,
          orderType: this.chosen,
          parameter: this.chosen == "price" ? this.price : this.time,
          wealth: this.currentUnit["name"],
          amount:
            this.chosen == "price" ? this.amountByPrice : this.amountByTime,
          major: "TÜRK LİRASI"
        })
        .then(response => {
          this.emirLoaded = true;
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    buyOrderNow() {
      let tl = parseFloat(
        JSON.parse(
          JSON.parse(localStorage.getItem("wallet"))["TÜRK LİRASI"]["amount"]
        )
      );
      if (!(tl > this.orderNowAmount * parseFloat(this.currentUnitTLPrice))) {
        this.$toasted.show(`Yeterli TÜRK LİRASI yok.`, alertoptions);
        return;
      }
      if (this.orderNowAmount < 0.01) {
        this.$toasted.show(`Miktar 0,01'den küçük olamaz.`, alertoptions);
        return;
      }
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      this.$toasted.show(`Alım emriniz alındı.`, options);
      console.log(this.currentUnit["name"],"#######")
      axios
        .post(`${this.$store.state.api}/buynow`, {
          userId: JSON.parse(localStorage.getItem("user")).id,
          orderType: "time",
          parameter: new Date().toString(),
          wealth: this.currentUnit["name"],
          amount: this.orderNowAmount,
          major: "TÜRK LİRASI"
        })
        .then(response => {
          this.emirLoaded = true;
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    sellOrderNow() {
      if (this.orderNowAmount < 0.1) {
        this.$toasted.show(`Miktar 0,1'den küçük olamaz.`, alertoptions);
        return;
      }
      let wealth = parseFloat(
        JSON.parse(localStorage.getItem("wallet"))[this.currentUnit["name"]][
          "amount"
        ]
      );
      if (!(wealth >= this.orderNowAmount)) {
        this.$toasted.show(
          `Yeterli ${this.currentUnit["name"]} yok.`,
          alertoptions
        );
        return;
      }
      //userId,orderType,parameter,wealth,amount,major
      this.emirLoaded = false;
      this.$toasted.show(`Satım emriniz alındı.`, options);
      axios
        .post(`${this.$store.state.api}/sellnow`, {
          userId: JSON.parse(localStorage.getItem("user")).id,
          orderType: "time",
          parameter: new Date().toString(),
          wealth: this.currentUnit["name"],
          amount: this.orderNowAmount,
          major: "TÜRK LİRASI"
        })
        .then(response => {
          this.emirLoaded = true;
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUserWallet: function() {
      axios
        .post(`${this.$store.state.api}/getuserwallet`, {
          id: JSON.parse(localStorage.getItem("user")).id
        })
        .then(response => {
          console.log(response.data)
          localStorage.setItem("wallet", JSON.stringify(response.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState({
    buyselldialog: state => state.buyselldialog
  })
};
</script>
<style>
.v-tabs-slider {
  background: #ff3366 !important;
}
v-text-field__slot input,
.v-select__slot input {
  text-align: center !important;
}
.centered-input >>> input {
  text-align: center !important;
}
.v-tabs-items {
  background: transparent !important;
}
.mdi-radiobox-blank {
  color: lightgray !important;
  caret-color: lightgray !important;
}
.alsat .v-btn__content {
  color: #fff !important;
}
.theme--light.v-data-table {
  background: rgba(0, 0, 0, 0.3);
}
.v-time-picker-title {
  justify-content: center !important;
}
</style>
