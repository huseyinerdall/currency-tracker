import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../components/common/Logout.vue";
import Register from "../views/Register.vue";
import Coins from "../views/Coins.vue";
import Golds from "../views/Golds.vue";
import CryptoCurrencyPage from "../views/CryptoCurrencyPage.vue";
import GoldsPage from "../views/GoldsPage.vue";
import CurrenciesPage from "../views/CurrenciesPage.vue";
import Exchanges from "../views/Exchanges.vue";
import Profile from "../views/Profile.vue";
import CaprazKurlar from "../views/CaprazKurlar.vue";
import UserWallet from "../views/UserWallet.vue";
import PageNotFound from "../views/PageNotFound.vue";
import PasswordReset from "../views/PasswordReset.vue";
import Activate from "../views/Activate.vue";
import Activating from "../views/Activating.vue";
import Contact from "../views/Contact.vue";
import ExchangeDetailPage from "@/views/ExchangeDetailPage";
import store from "../store/index";
import axios from "axios";
// Admin Side
function toCapitalize(str) {
  str = str
      .split("-")
      .map(
          w =>
              w[0].toLocaleUpperCase("tr-TR") + w.substr(1).toLocaleLowerCase("tr-TR")
      )
      .join(" ");
  return str;
}
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/kripto-paralar",
    name: "CryptoCurrencyPage",
    component: CryptoCurrencyPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/kripto-para-borsalari",
    name: "Exchanges",
    component: Exchanges,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/altin-fiyatlari",
    name: "GoldsPage",
    component: GoldsPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/capraz-kurlar",
    name: "CaprazKurlar",
    component: CaprazKurlar,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/doviz",
    name: "Doviz",
    component: CurrenciesPage,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profil",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
      guest: true
    }
  },
  {
    path: "/passwdreset",
    name: "PasswordReset",
    component: PasswordReset,
    meta: {
      requiresAuth: false,
      guest: true
    }
  },
  {
    path: "/activate",
    name: "Activate",
    component: Activate,
    meta: {
      activate: true,
      requiresAuth: true
    }
  },
  {
    path: "/kripto-paralar/:coin",
    name: "Coins",
    component: Coins,
    meta: {
      requiresAuth: false
    }
    /*props(route) { // <-- props as a Function
            return { coin: toCapitalize(route.params.coin).split('-').join(' ') };
        },*/
  },
  {
    path: "/altin-fiyatlari/:gold",
    name: "Golds",
    component: Golds,
    meta: {
      requiresAuth: false
    },
    props(route) {
      // <-- props as a Function
      return {
        gold: toCapitalize(route.params.gold)
            .split("-")
            .join(" ")
      };
    }
  },
  {
    path: "/doviz-kurlari/:gold",
    name: "Currencies",
    component: Golds,
    meta: {
      requiresAuth: false
    },
    props(route) {
      // <-- props as a Function
      return {
        gold: route.params.gold
            .toLocaleUpperCase("tr-TR")
            .split("-")
            .join(" ")
      };
    }
  },
  {
    path: "/borsalar/:exchangeid",
    name: "ExchangeDetailPage",
    component: ExchangeDetailPage,
    meta: {
      requiresAuth: false
    },
    props(route) {
      // <-- props as a Function
      return {
        exchangeid: route.params.exchangeid
      };
    }
  },
  {
    path: "/userwallet",
    name: "UserWallet",
    component: UserWallet,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/activating/:activationcode/user/:userid",
    name: "activating",
    component: Activating,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/iletisim",
    name: "Contact",
    component: Contact,
    meta: {
      requiresAuth: false
    }
  },
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('userinfo');
  if(store.state.userinfo == null){
    1;
  }else if(store.state.userinfo.active == 0){
    axios
        .post(`${store.state.api}/getuserinfo`,{
          id: store.state.userinfo.id
        })
        .then((userinfo) => {
          if (userinfo.data == 1){
            let temp = store.state.userinfo;
            temp.active = 1
            localStorage.setItem('user',JSON.stringify(temp));
            localStorage.setItem('jwt','activated');
            router.push({name: 'Home'})
          }
        })
  }else{
    //if user is active
    1;
  }
  //store.commit('wallet');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.userinfo) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } /*else if (null) {
      next();
    }*/ else if (to.path == "/activating") {
      next();
    } else if (store.state.userinfo.active == 1 && to.path.toLowerCase() == "/activate") {
      next({ name : "Home" });
    } else if (store.state.userinfo.active == 0 && to.path != "/logout") {
      next();
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        next();
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jwt") == null) {
      next();
    } else if (to.path == "/register") {
      next('/userwallet');
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});

export default router;