import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueApexCharts from 'vue-apexcharts';
import currencies from './assets/currencies';
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);
Vue.config.productionTip = false;

//axios.defaults.baseConfig = "http://localhost:4000/";
Vue.use(VueAxios, axios)

//for server
Vue.prototype.$addr = 'http://localhost'
Vue.prototype.$port = '4000'

Vue.filter('signint', function(value) {
    try{
        if (value >= 0) return "+" + value.toFixed(2);
        return value.toFixed(2);
    }catch(e){
        return "+0.00";
    }
})

Vue.filter('signintt', function(value) {
    try{
        if (value >= 0) return "+" + value.toFixed(4);
        return value.toFixed(4);
    }catch(e){
        return "+0.0000";
    }
})

Vue.filter('shorten', function(value) {
    if(value.length > 15){
        let tempArray = value.split(" ");
        let tempString = '';
        for (let i = 0; i < tempArray.length; i++) {
            if(i==0){
                tempString += tempArray[i][0] + '. ';
            }else{
                tempString += tempArray[i] + ' ';
            }
        }
        return tempString;
    }
    return value;
})

Vue.filter('length', function(value) {
    try{
        value = JSON.parse(value);
        return value.length;
    }catch(e){
        console.log(e);
        return 0;
    }
})

Vue.filter('nameAvatar', function(value) {
    let splited = value.split(" ");
    let len = splited.length;
    return splited[0][0] + splited[len - 1][0];
})

Vue.filter('dateStandartFormat', function(value) {
    return new Date(value).toLocaleString("tr");
})

Vue.filter('onlyTime', function(value) {
    return new Date(value).toLocaleTimeString();
})

Vue.filter('uppercase', function(value) {
    return value.toUpperCase()
})

Vue.filter('tofixedftwo', function(value) {
    value = +value;
    return value.toFixed(2);
})

Vue.filter('tofixedfour', function(value) {
    value = +value;
    return value.toFixed(4);
})

Vue.filter('tosymbol', function(value) {
    for (let i = 0; i < currencies.length; i++) {
        if(currencies[i]["name"] == value){
            return currencies[i]["symbol"];
        }
    }
    return "UNDEF";
})


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");