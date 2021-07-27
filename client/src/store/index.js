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
    tdFontSize: "12px",
    token: localStorage.getItem("jwt") || "",
    status: "",
    commentDrawer: false,
    buyselldialog: false,
    userwalletdialog: false,
    userorderdialog: false,
    isLight: localStorage.getItem("light") == "true",
    login: false,
    dolar: 1
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    commentDrawer: state => state.commentDrawer,
    buyselldialog: state => state.buyselldialog,
    userwalletdialog: state => state.userwalletdialog,
    userorderdialog: state => state.userorderdialog,
    isLight: state => state.isLight,
    login: state => state.login || !!localStorage.getItem("user"),
    dolar: state => state.dolar

  },
  mutations: {
    ["AUTH_REQUEST"]: state => {
      state.status = "loading";
    },
    ["AUTH_SUCCESS"]: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    ["AUTH_ERROR"]: state => {
      state.status = "error";
    },
    commentDrawer(state) {
      state.commentDrawer = !state.commentDrawer;
    },
    buyselldialog(state) {
      state.buyselldialog = !state.buyselldialog;
    },
    userwalletdialog(state) {
      state.userwalletdialog = !state.userwalletdialog;
    },
    userorderdialog(state) {
      state.userorderdialog = !state.userorderdialog;
    },
    login(state, loading) {
      state.login = loading;
    },
    isLight(state) {
      if (state.isLight) {
        localStorage.setItem("light", false);
        state.isLight = false;
      } else {
        state.isLight = true;
        localStorage.setItem("light", true);
      }
    },
    dolar(state) {
      setInterval(() => {
        axios.get("https://finans.truncgil.com/today.json").then(response => {
          state.dolar = parseFloat(response.data["USD"]["Satış"].replace(",","."));
        });
      },5000)
    }
  },
  actions: {
    ["AUTH_REQUEST"]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        // The Promise used for router redirect in login
        commit("AUTH_REQUEST");
        axios({ url: "auth", data: user, method: "POST" })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("jwt", token); // store the token in localstorage
            commit("AUTH_SUCCESS", token);
            // you have your token, now log in your user :)
            dispatch("USER_REQUEST");
            resolve(resp);
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            localStorage.removeItem("jwt"); // if the request fails, remove any possible user token if possible
            reject(err);
          });
      });
    },
    ["AUTH_LOGOUT"]: ({ commit, dispatch }) => {
      console.log(dispatch);
      return new Promise((resolve, reject) => {
        console.log(reject);
        commit("AUTH_LOGOUT");
        localStorage.removeItem("jwt"); // clear your user's token from localstorage
        resolve();
      });
    }
  },
  modules: {}
});
