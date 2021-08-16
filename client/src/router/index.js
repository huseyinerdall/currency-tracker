import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../components/common/Logout.vue";
import Register from "../views/Register.vue";
import Coins from "../views/Coins.vue";
import Golds from "../views/Golds.vue";
import Wallet from "../views/Wallet.vue";
import CryptoCurrencyPage from "../views/CryptoCurrencyPage.vue";
import GoldsPage from "../views/GoldsPage.vue";
import CurrenciesPage from "../views/CurrenciesPage.vue";
import Profile from "../views/Profile.vue";
import CaprazKurlar from "../views/CaprazKurlar.vue";
import UserWallet from "../views/UserWallet.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Activate from "../views/Activate.vue";
import Activating from "../views/Activating.vue";
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
      requiresAuth: false
    }
  },
  {
    path: "/activate",
    name: "Activate",
    component: Activate,
    meta: {
      activate: true
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
    path: "/wallet",
    name: "Wallet",
    component: Wallet,
    meta: {
      requiresAuth: true
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
  { path: "*", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /*if (localStorage.getItem('jwt') != null) {
        if (to.matched.some(record => record.name == 'Login')) {
            next({ name: 'Home' })
        }
    }*/
  let user = JSON.parse(localStorage.getItem("user"));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else if (to.path == "/activating") {
      next();
    } else if (user.active == 1 && to.path == "/activate") {
      next({ name : "Home" });
    } else if (user.active == 0 && to.path != "/logout") {
      next({ name : "Activate" });
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
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});

export default router;
