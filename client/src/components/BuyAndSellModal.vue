<template>
  <v-container>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"
        style="border-radius:0 !important;"
        v-model="$store.state.buyselldialog"
    >
      <v-container style="border: 1px solid #ddd;border-radius:0;position:relative;"
                   :style="$store.state.isLight ? 'background-color:#f9f9f9;' : 'background-color:rgba(11,14,63,0.8);'"

      >
        <div class="pa-4">
          <v-btn
              icon
              dark
              @click="$store.commit('buyselldialog')"
              style="position:absolute;right:10px;top:10px;"
          >
            <v-icon :color="$store.state.isLight ? 'black' : 'white'">mdi-close</v-icon>
          </v-btn>
          <div>
            <v-row>
              <v-avatar size="40">
                <img
                    :src="currentUnit.image"
                >
              </v-avatar>
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
              <v-col class="d-flex flex-row justify-space-between">
                <div>
                  <span :class="$store.state.isLight ? '' : 'white--text'">$ {{currentUnit.price}}</span>
                  <span :class="$store.state.isLight ? '' : 'white--text'" class="ml-8">₺ {{ (currentUnit.price*dolar) |binayracveondalik}}</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
        <div style="border-top:1px solid #ddd;">
          <v-tabs
              v-model="tab"
              background-color="transparent"
              right
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
                  :style="$store.state.isLight ? 'background-color:#f9f9f9;' : 'background-color:rgba(11,14,63,0.1);'"
                  style="border-radius: 0;height:240px;"
              >
                <v-row style="margin-top: 20px;">
                  <v-col cols="3" class="pb-0 pt-0">
                    <v-text-field
                        :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                        style="padding: 0 16px !important;font-size: 12px;"
                        class="centered-input ml-6"
                        :dark="!$store.state.isLight"
                        :color="$store.state.isLight ? 'black' : 'white'"
                        placeholder="Miktarı Giriniz"
                    ></v-text-field>

                  </v-col>
                  <v-col cols="3" class="pb-0 pt-0">
                    <v-text-field
                        :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                        style="padding: 0 16px !important;font-size: 12px;"
                        class="centered-input ml-6"
                        :dark="!$store.state.isLight"
                        :color="$store.state.isLight ? 'black' : 'white'"
                        placeholder="0,00"
                        v-model="currentUnit.price"
                        readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1" class="text-center pb-0 pt-0 ma-0">
                    <v-icon size="40" :color="$store.state.isLight ? '#ff3366' : '#ffbf00'" class="mt-1" :class="$vuetify.breakpoint.smAndDown ? 'mdi-rotate-90' : ''">
                      mdi-arrow-right
                    </v-icon>
                  </v-col>
                  <v-col cols="3" class="pb-0 pt-0">
                    <v-text-field
                        :color="$store.state.isLight ? 'black' : 'white'"
                        class="ml-6 centered-input"
                        :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                        style="padding: 0 16px !important;font-size:12px !important;"
                        :dark="!$store.state.isLight"
                        readonly
                        placeholder="Toplam"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <div class="d-flex flex-row justify-content-end alsat" style="margin-top: 87px;">
                  <v-spacer></v-spacer>
                  <div>
                    <v-btn
                        class="mt-6 pl-1"
                        tile
                        color="rgb(248, 73, 96)"
                    >
                      <v-icon left style="background-color: rgba(0,0,0,.1);height: 38px;">
                        mdi-arrow-down
                      </v-icon>
                      Sat
                    </v-btn>
                    <v-btn
                        class="mt-6 pl-1 ml-4"
                        tile
                        color="rgb(2, 192, 118)"
                    >
                      <v-icon left style="background-color: rgba(0,0,0,.1);height: 38px;">
                        mdi-arrow-up
                      </v-icon>
                      Al
                    </v-btn>
                  </div>
                </div>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container fluid
                           :style="$store.state.isLight ? 'background-color:#f9f9f9;' : 'background-color:rgba(0,0,0,0.1);'"
                           style="border-radius: 0;height:240px;">
                <v-radio-group v-model="chosen">
                  <v-radio value="fiyatagore" color="#ff3366">
                    <template v-slot:label>
                      <div :class="$store.state.isLight ? '' : 'white--text'"
                           style="width: 100%;align-items: center;justify-content: space-between;"
                      class="d-flex flex-row">
                        <div>Fiyata Göre</div>
                        <div class="d-flex flex-row">
                          <v-text-field
                              :color="$store.state.isLight ? 'black' : 'white'"
                              class="ml-6 centered-input"
                              :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                              style="padding: 0 16px !important;font-size:12px !important;"
                              :dark="!$store.state.isLight"
                              placeholder="Miktarı Giriniz"
                          ></v-text-field>
                          <v-text-field
                              v-model="sum"
                              :color="$store.state.isLight ? 'black' : 'white'"
                              class="ml-6 centered-input"
                              :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                              style="padding: 0 16px !important;font-size:12px !important;"
                              :dark="!$store.state.isLight"
                              readonly
                              placeholder="Fiyat Limitini Giriniz"
                          ></v-text-field>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="tarihegore" color="#ff3366">
                    <template v-slot:label>
                      <div :class="$store.state.isLight ? '' : 'white--text'"
                           style="width: 100%;align-items: center;justify-content: space-between;"
                           class="d-flex flex-row">
                        <div>Tarihe Göre</div>
                        <div class="d-flex flex-row">
                          <v-text-field
                              :color="$store.state.isLight ? 'black' : 'white'"
                              class="ml-6 centered-input"
                              :style="'width:'+$vuetify.breakpoint.smAndDown ? 'auto' : '80px'"
                              style="padding: 0 16px !important;font-size:12px !important;"
                              :dark="!$store.state.isLight"
                              placeholder="Miktarı Giriniz"
                          ></v-text-field>
                          <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                  v-model="date"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  class="ml-6"
                                  style="padding: 0 16px !important;font-size:12px !important;"
                                  :dark="!$store.state.isLight"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                locale="tr"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                              >
                                İptal
                              </v-btn>
                              <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
                <div class="d-flex flex-row justify-content-end alsat">
                  <v-spacer></v-spacer>
                  <div style="align-items:end;" class="text--white">
                    <v-btn
                        class="mt-6 pl-1"
                        tile
                        color="rgb(248, 73, 96)"
                    >
                      <v-icon left style="background-color: rgba(0,0,0,.1);height: 38px;">
                        mdi-arrow-down
                      </v-icon>
                      Sat
                    </v-btn>
                    <v-btn
                        class="mt-6 pl-1 ml-4 text--white"
                        tile
                        color="rgb(2, 192, 118)"
                    >
                      <v-icon left color="white" style="background-color: rgba(0,0,0,.1);height: 38px;">
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
import { mapState } from 'vuex';
import axios from "axios";
export default {
  name: "BuyAndSellModal",
  data: () => ({
    tab: null,
    image: '',
    items: [
      'Hemen Al', 'Ödeme Emri'
    ],
    chosen: 'fiyatagore',
    data: [],
    allUnits: [],
    images: [],
    currentUnit: 'Bitcoin',
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    dolar: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  created() {
    let app = this;
    if(localStorage.getItem('coins250')){
      this.data = JSON.parse(localStorage.getItem('coins250'));
      this.allUnits = this.data.map((arr)=>{
        return (arr["name"]+"-"+arr["shortName"].toUpperCase());
      })
    }
    axios.get('https://finans.truncgil.com/today.json')
        .then(response =>{
          app.dolar = response.data["ABD DOLARI"]["Satış"];
        })
        .catch(err => console.log(err));
    this.currentUnit = this.data[0];
  },
  methods: {
    chooseUnit(){
      console.log(this.currentUnit);
      this.image = this.currentUnit.image;
    },
  },
  computed: mapState({
    buyselldialog: state => state.buyselldialog,
  })
};
</script>
<style>
.v-tabs-slider{
  background: #ff3366 !important;
}
v-text-field__slot input,
.v-select__slot input{
  text-align: center !important;
}
.centered-input >>> input {
  text-align: center !important;
}
.v-tabs-items{
  background: transparent !important;
}
.mdi-radiobox-blank{
  color: lightgray !important;
  caret-color: lightgray !important;
}
.alsat .v-btn__content{
  color:#fff !important;
}
</style>
