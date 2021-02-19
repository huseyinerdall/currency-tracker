import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Para.Guru",
    domainName: "para.guru",
    addr: process.env.VUE_APP_CLIENT_URL,
    api: process.env.VUE_APP_API_URL,
    admin: process.env.VUE_APP_ADMIN_URL,
    port: "4000",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
});
