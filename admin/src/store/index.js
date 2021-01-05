import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Para.Guru",
    domainName: "para.guru",
    addr: "http://localhost:4000",
    api:"http://localhost:4000",
    admin:"http://localhost:4000/admin",
    //addr: "https://para.guru",
    //api: "https://para.guru/api",
    //admin: "https://para.guru/admin",
    port: "4000",
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
});
