import Vue from "vue";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import VueApexCharts from "vue-apexcharts";
import DatetimePicker from "vuetify-datetime-picker";
import currencies from "./assets/currencies";
import Toasted from "vue-toasted";
import VueAuthenticate from 'vue-authenticate';
import _ from 'lodash';
import moment from 'moment';
import VueSocialSharing from 'vue-social-sharing'
import VueHorizontal from "vue-horizontal";

Vue.component(VueHorizontal);
Vue.use(VueSocialSharing);
moment.suppressDeprecationWarnings = true;
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});
Vue.use(VueApexCharts);
Vue.use(DatetimePicker);

Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:4000', // Your API domain

  providers: {
    facebook: {
      clientId:"543577080115436",
      name: 'facebook',
      url: '/auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v10.0/dialog/oauth',
      redirectUri: "https://para.guru/",
      requiredUrlParams: ['display', 'scope'],
      scope: ['email'],
      scopeDelimiter: ',',
      responseType: 'token',
    },
  }
})
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;
//axios.defaults.baseConfig = "http://localhost:4000/";
Vue.use(VueAxios, axios);
Vue.use(Toasted);
Vue.use(_);
Vue.use(moment);

//for server
Vue.prototype.$addr = "http://localhost";
Vue.prototype.$port = "4000";

Vue.filter("turkishCurrencyformat", function(num) {

  return new Intl.NumberFormat("tr-TR", {minimumFractionDigits: 4}).format(
      num
  ) || '-';

});

Vue.filter("tocapitalize", function(value) {

  return value.toString().toUpperCase()

});

Vue.filter("currencyformat", function(value) {
  let temp = +value;
  try {
    value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(temp);
    return value;
  } catch (e) {
    return value;
  }
});

Vue.filter("tokebabcase", function(str) {
  str = str.toLowerCase();
  let strArr = str.split(" ");
  let kebabCaseStr = "";
  kebabCaseStr = strArr.join("-");
  return kebabCaseStr;
});

Vue.filter("currencyformattr", function(value) {
  let value1 = value;
  let temp = parseFloat(value1);
  try {
    value = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(temp);
    return value1;
  } catch (e) {
    console.log(e);
    return value1;
  }
});

Vue.filter("binayracveondalik", function(value) {
  let temp = parseFloat(value);
  try {
    value = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 4 }).format(
        temp
    );
    return value;
  } catch (e) {
    return value;
  }
});

Vue.filter("signint", function(value) {
  try {
    if (value >= 0) return "+" + value.toFixed(4).replace('.',',');
    return value.toFixed(4).replace('.',',');
  } catch (e) {
    return "+0,0000";
  }
});

Vue.filter("signintt", function(value) {
  try {
    if (value >= 0) return "+" + value.toFixed(4).replace('.',',');
    return value.toFixed(4).replace('.',',');
  } catch (e) {
    return "+0.0000";
  }
});

Vue.filter("shorten", function(value) {
  if (value == "SUUDİ ARABİSTAN RİYALİ") {
    return "S.A. RİYALİ";
  }
  if (value.length > 15) {
    let tempArray = value.split(" ");
    let tempString = "";
    for (let i = 0; i < tempArray.length; i++) {
      if (i == 0) {
        tempString += tempArray[i][0] + ". ";
      } else {
        tempString += tempArray[i] + " ";
      }
    }
    return tempString;
  }
  return value;
});

Vue.filter("length", function(value) {
  try {
    value = JSON.parse(value);
    return value.length;
  } catch (e) {
    return 0;
  }
});

Vue.filter("nameAvatar", function(value) {
  let splited = value.split(" ");
  let len = splited.length;
  return splited[0][0] + splited[len - 1][0];
});

Vue.filter("dateStandartFormat", function(value) {
  let result = '';
  try{
    result = new Date(value).toLocaleString("tr");
  }
  catch {
    result = value;
  }
  return result;
});

Vue.filter("onlyTime", function(value) {
  return new Date(value).toLocaleTimeString();
});

Vue.filter("uppercase", function(value) {
  return value.toUpperCase().replaceAll('-', ' ');
});

Vue.filter("tofixedftwo", function(value) {
  value = +value;
  return value.toFixed(2).replace('.',',');
});

Vue.filter("tofixedfour", function(value) {
  value = +value;
  return value.toFixed(4).replace('.',',');
});

Vue.filter("tosymbol", function(value) {
  for (let i = 0; i < currencies.length; i++) {
    if (currencies[i]["name"] == value) {
      return currencies[i]["symbol"];
    }
  }
  return "";
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");