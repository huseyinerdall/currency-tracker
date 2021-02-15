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
    tdFontSize: "13px",
    token: localStorage.getItem('jwt') || '',
    status: '',
    commentDrawer: false,
    buyselldialog: false,
    isLight: (localStorage.getItem('light')=="true"),
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    commentDrawer: state => state.commentDrawer,
    buyselldialog: state => state.buyselldialog,
    isLight: state => state.isLight,
  },
  mutations: {
    ["AUTH_REQUEST"]: (state) => {
      state.status = 'loading'
    },
    ["AUTH_SUCCESS"]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    ["AUTH_ERROR"]: (state) => {
      state.status = 'error'
    },
    commentDrawer(state) {
      state.commentDrawer = !state.commentDrawer;
    },
    buyselldialog(state) {
      console.log(state.buyselldialog)
      state.buyselldialog = !state.buyselldialog;
    },
    isLight(state) {
      if(state.isLight){
        localStorage.setItem('light',false);
        state.isLight = false;
      }else{
        state.isLight = true;
        localStorage.setItem('light',true);
      }

    },
  },
  actions: {
    ["AUTH_REQUEST"]: ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit("AUTH_REQUEST")
        axios({url: 'auth', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              localStorage.setItem('jwt', token) // store the token in localstorage
              commit("AUTH_SUCCESS", token)
              // you have your token, now log in your user :)
              dispatch("USER_REQUEST")
              resolve(resp)
            })
            .catch(err => {
              commit("AUTH_ERROR", err)
              localStorage.removeItem('jwt') // if the request fails, remove any possible user token if possible
              reject(err)
            })
      })
    },
    ["AUTH_LOGOUT"]: ({commit, dispatch}) => {
      console.log(dispatch)
      return new Promise((resolve, reject) => {
        console.log(reject)
        commit("AUTH_LOGOUT")
        localStorage.removeItem('jwt') // clear your user's token from localstorage
        resolve()
      })
    }
  },
  modules: {}
});
