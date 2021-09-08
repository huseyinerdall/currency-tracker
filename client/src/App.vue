<template>
  <main>
    <v-app v-if="$route.path != '/admin'">
      <v-app-bar
        app
        dark
        v-if="$vuetify.breakpoint.mdAndUp"
        style="height: 94px;"
        :class="{ koyu: !$store.state.isLight, acik: $store.state.isLight }"
      >
        <div class="d-flex align-end">
          <router-link to="/">
            <v-img
              alt="para.guru Logo"
              class="shrink mr-2"
              contain
              src="./assets/logo.png"
              transition="scale-transition"
              width="90"
            />
          </router-link>
        </div>

        <v-btn
          href="/doviz"
          text
          style="margin-left: 2%;"
          :light="$store.state.isLight"
        >
          <span class="mr-4">DÖVİZ</span>
        </v-btn>
        <v-btn href="/altin-fiyatlari" text :light="$store.state.isLight">
          <span class="mr-4">ALTIN</span>
          <!--<v-icon>mdi-home</v-icon>-->
        </v-btn>
        <v-btn href="/kripto-paralar" text :light="$store.state.isLight">
          <span class="mr-4">KRİPTO PARA</span>
        </v-btn>
        <v-btn href="/capraz-kurlar" text :light="$store.state.isLight">
          <span class="mr-4">ÇAPRAZ KURLAR</span>
        </v-btn>
        <v-btn href="/userwallet" text :light="$store.state.isLight">
          <span class="mr-4">CÜZDAN</span>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="column">
          <div>
            <v-btn
                class="mt-6 mr-2 pl-1"
                tile
                color="rgb(248, 73, 96)"
                @click="$store.state.userinfo == null
                ? ($route.path != '/login' ? $router.push({name:'Login'}) : $toasted.error('Giriş yapmalısın!',{fullWidth:true,icon:'error',duration:1000}))
                : (($store.state.userinfo.active == 1) ? $store.commit('buyselldialog') : $store.commit('activatealert'))"
            >
              <v-icon left style="background-color: rgba(0,0,0,.1);height: 38px;">
                mdi-arrow-down
              </v-icon>
              Sat
            </v-btn>
            <v-btn
                class="mt-6 mr-6 pl-1"
                tile
                color="rgb(2, 192, 118)"
                @click="$store.state.userinfo == null
                ? ($route.path != '/login' ? $router.push({name:'Login'}) : $toasted.error('Giriş yapmalısın!',{fullWidth:true,icon:'error',duration:1000}))
                : (($store.state.userinfo.active == 1) ? $store.commit('buyselldialog') : $store.commit('activatealert'))"
            >
              <v-icon left style="background-color: rgba(0,0,0,.1);height: 38px;">
                mdi-arrow-up
              </v-icon>
              Al
            </v-btn>
          </div>
          <div>
            <span style="font-size: 10px;">*Bu bir yatırım oyunudur.</span>
          </div>
        </div>
        <v-btn
          class="mt-6 mr-6"
          fab
          dark
          small
          :color="$store.state.isLight ? '#fff' : '#0f1447'"
          @click="$store.commit('isLight')"
        >
          <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
            mdi-theme-light-dark
          </v-icon>
        </v-btn>

        <v-menu
            bottom
            min-width="200px"
            rounded
            v-if="($store.state.login || isAuthenticated) && $store.state.userinfo"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                class="mt-6 mr-6"
                icon
                small
                v-on="on"
            >
              <v-avatar size="40">
                <v-img v-if="user.profileImage!=''" :src="user.profileImage.indexOf('http')>-1 ? user.profileImage : $store.state.api+'/uploads/'+ user.profileImage"></v-img>
                <img v-else :src="$store.state.api + '/defaultuserprofileimage.png'" alt="" />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center pb-0">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img v-if="$store.state.userinfo" :src="$store.state.userinfo || $store.state.userinfo.profileImage"></v-img>
                  <img v-else :src="$store.state.api + '/defaultuserprofileimage.png'" alt="" />
                </v-avatar>
                <h3>{{ $store.state.userinfo.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ $store.state.userinfo.email }}
                </p>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/profil"
                >
                  PROFİL
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/userwallet"
                >
                  CÜZDAN
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/logout"
                >
                  ÇIKIŞ
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <h1
          class="body-1"
          style="padding-top: 30px;font-size:24px !important;"
          :style="$store.state.isLight ? 'color:rgba(0, 0, 0, 0.87);' : ''"
        >
          {{ clock }}
        </h1>
      </v-app-bar>
      <!--Desktop menu end-->
      <!--Mobile menu begin-->
      <v-app-bar
        :class="{ koyu: !$store.state.isLight, acik: $store.state.isLight }"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <router-link to="/" class="pa-0 ma-0">
          <v-img
            alt="para.guru Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.webp"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <router-link to="/" class="pa-0 ma-0" tag="span">
          <h3
            class="text-xl-h4 ml-2"
            :class="$store.state.isLight ? 'black--text' : 'white--text'"
          >
            {{ $store.state.appName }}
          </h3>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          fab
          dark
          small
          :color="$store.state.isLight ? '#fff' : '#0f1447'"
          @click="$store.commit('isLight')"
        >
          <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
            mdi-theme-light-dark
          </v-icon>
        </v-btn>

        <v-menu
            offset-x
            min-width="200px"
            rounded
            v-if="($store.state.login || isAuthenticated) && $store.state.userinfo"
        >
          <template v-slot:activator="{ on }">
            <v-btn
                class="mr-1"
                icon
                small
                v-on="on"
            >
              <v-avatar size="40">
                <v-img v-if="$store.state.userinfo" :src="$store.state.userinfo || $store.state.userinfo.profileImage"></v-img>
                <img v-else :src="$store.state.api + '/defaultuserprofileimage.png'" alt="" />
              </v-avatar>

            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center pb-0">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img v-if="$store.state.userinfo" :src="$store.state.userinfo || $store.state.userinfo.profileImage"></v-img>
                  <img v-else :src="$store.state.api + '/defaultuserprofileimage.png'" alt="" />
                </v-avatar>
                <h3>{{ $store.state.userinfo.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ $store.state.userinfo || $store.state.userinfo.email }}
                </p>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/profil"
                >
                  PROFİL
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/userwallet"
                >
                  CÜZDAN
                </v-btn>
                <v-divider></v-divider>
                <v-btn
                    depressed
                    rounded
                    text
                    href="/logout"
                >
                  ÇIKIŞ
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-app-bar-nav-icon
          dark
          @click="dialog = true"
          style="margin-right: -10px;"
        >
          <v-btn
            fab
            dark
            small
            :color="$store.state.isLight ? '#fff' : '#0f1447'"
          >
            <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
              mdi-menu
            </v-icon>
          </v-btn>
        </v-app-bar-nav-icon>

        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card
            :style="
              $store.state.isLight
                ? 'background-color: rgba(255,255,255,.9);color:#000;'
                : 'background-color: rgba(0,0,0,.9);color:#fff;'
            "
          >
            <v-toolbar
              style="border-bottom: 1px solid #0059b2;"
              :style="
                $store.state.isLight
                  ? 'background-color:rgba(255,255,255,0.83);'
                  : 'background-color:#1d2460;'
              "
            >
              <v-toolbar-title>
                <v-img
                  alt="para.guru Logo"
                  class="shrink mr-2"
                  contain
                  src="./assets/logo.webp"
                  transition="scale-transition"
                  width="40"
                />
              </v-toolbar-title>
              <h3
                class="text-xl-h4 ml-2"
                :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
              >
                {{ $store.state.appName }}
              </h3>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon :color="$store.state.isLight ? 'black' : 'white'"
                  >mdi-close</v-icon
                >
              </v-btn>
            </v-toolbar>

            <v-list-item-group dark>
              <v-list-item to="/doviz" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-home-currency-usd</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      DÖVİZ
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/altin-fiyatlari" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-gold</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      ALTIN
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/kripto-paralar" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-bitcoin</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      KRİPTO PARA
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/capraz-kurlar" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-currency-sign</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      ÇAPRAZ KURLAR
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/userwallet" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                        text
                        :light="$store.state.isLight"
                        :dark="!$store.state.isLight"
                    >
                      CÜZDAN
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
            </v-list-item-group>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-footer v-if="$vuetify.breakpoint.smAndDown" app bottom fixed padless style="background: rgb(29, 36, 96);">
        <div class="column" style="width: 100%;">
          <div>
            <v-row class="pl-4 pr-4">
              <v-col>
                <v-btn block
                       color="rgb(2, 192, 118)"
                       style="color: #fff;"
                       @click="$store.state.userinfo == null
                                ? ($route.path != '/login' ? $router.push({name:'Login'}) : $toasted.error('Giriş yapmalısın!',{fullWidth:true,icon:'error',duration:1000}))
                                : (($store.state.userinfo.active == 1) ? $store.commit('buyselldialog') : $store.commit('activatealert'))"
                >
                  AL
                </v-btn>
              </v-col>
              <v-col>
                <v-btn block
                       color="rgb(248, 73, 96)"
                       style="color: #fff;"
                       @click="$store.state.userinfo == null
                                ? ($route.path != '/login' ? $router.push({name:'Login'}) : $toasted.error('Giriş yapmalısın!',{fullWidth:true,icon:'error',duration:1000}))
                                : (($store.state.userinfo.active == 1) ? $store.commit('buyselldialog') : $store.commit('activatealert'))"
                >
                  SAT
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div style="text-align: center;">
            <span style="font-size:10px;color:#fff;">*Bu bir yatırım oyunudur.</span>
          </div>
        </div>

      </v-footer>

      <v-main :class="{ 'v-main-light': $store.state.isLight }">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
    <v-app v-else>
      <router-view />
    </v-app>
    <BuyAndSellModal />
    <v-dialog v-if="$store.state.userinfo" v-model="$store.state.activatealert">
      <v-alert
          border="right"
          colored-border
          type="error"
          elevation="2"
          dense
          class="mt-6"
      >
        Hesabınız aktif değil.Bu haldeyken al sat yapamazsınız.Hesabı aktif hale getirmek için
        <v-chip small>{{ $store.state.userinfo.email}}</v-chip> adresinize
        <v-btn x-small>buraya</v-btn>
        tıklayarak eposta gönderin.
      </v-alert>
    </v-dialog>
  </main>
</template>

<script>
//import VueJwtDecode from "vue-jwt-decode";
import Footer from "./components/common/Footer";
import BuyAndSellModal from "./components/BuyAndSellModal";

export default {
  name: "App",

  components: {
    Footer,
    BuyAndSellModal
  },

  data: () => ({
    //isAuthenticated: false,
    dialog: false,
    isDropped: false,
    clock: "",
  }),
  methods: {
    updateTime: function() {
      var cd = new Date();
      this.clock = `${cd.getHours() < 10 ? "0" + cd.getHours() : cd.getHours()}:
                    ${
                      cd.getMinutes() < 10
                        ? "0" + cd.getMinutes()
                        : cd.getMinutes()
                    }:
                    ${
                      cd.getSeconds() < 10
                        ? "0" + cd.getSeconds()
                        : cd.getSeconds()
                    }`;
    }
  },
  created() {
    this.$store.commit('dolar');
    setInterval(this.updateTime, 1000);
    //this.isAuthenticated = !!(localStorage.getItem("user"))||(localStorage.getItem("user") != undefined);
  },
  mounted() {
    //this.isAuthenticated = !!(localStorage.getItem("user"))||(localStorage.getItem("user") != undefined);
  },
  computed: {
    user() {
      try{
        return JSON.parse(localStorage.getItem("user")) ||null;
      }catch (e) {
        console.log(e);
        localStorage.removeItem("user");
        return null;
      }
    },
    isAuthenticated() {
      return !!(localStorage.getItem("user"))||(localStorage.getItem("user") != undefined);
    }
  }
};
</script>

<style media="screen">
.v-main {
  background-image: url("assets/back.fw.webp") !important;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.v-main-light {
  background-color: #ffffff !important;
  background-blend-mode: lighten !important;
}
.v-toolbar__content a {
  margin-top: 30px;
  font-weight: 800;
}
@media screen and (min-width: 768px) {
  .v-toolbar__content {
    max-width: 88%;
    margin: 0 auto;
  }
}

.koyu {
  border-bottom: 1px solid #0059b2 !important;
  background-color: #1d2460 !important;
}
.acik {
  border-bottom: 1px solid #0059b2;
  background-color: #f9f9f9 !important;
}
.v-application a{
  font-weight: 400;
}
</style>
