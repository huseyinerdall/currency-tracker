import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Coins from "../views/Coins.vue";
import Golds from "../views/Golds.vue";
import Wallet from "../views/Wallet.vue";
import CryptoCurrencyPage from "../views/CryptoCurrencyPage.vue";
import GoldsPage from "../views/GoldsPage.vue";
import CurrenciesPage from "../views/CurrenciesPage.vue";
import Profile from "../views/Profile.vue";
import CaprazKurlar from "../views/CaprazKurlar.vue";

// Admin Side
import Dashboard from "../views/admin/Dashboard.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            guest: true
        }
    },
    {
        path: "/kripto-para",
        name: "CryptoCurrencyPage",
        component: CryptoCurrencyPage,
        meta: {
            guest: true
        }
    },
    {
        path: "/altin-fiyatlari",
        name: "GoldsPage",
        component: GoldsPage,
        meta: {
            guest: true
        }
    },
    {
        path: "/capraz-kurlar",
        name: "CaprazKurlar",
        component: CaprazKurlar,
        meta: {
            guest: true
        }
    },
    {
        path: "/doviz",
        name: "Doviz",
        component: CurrenciesPage,
        meta: {
            guest: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/logout",
        name: "Logout",
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
            guest: true
        }
    },
    {
        path: "/coins/:coin",
        name: "Coins",
        component: Coins,
        meta: {
            guest: true
        }
    },
    {
        path: "/golds/:gold",
        name: "Golds",
        component: Golds,
        meta: {
            guest: true
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
        path: '/admin',
        name: 'admin',
        component: Dashboard,
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    var interval_id = window.setInterval("", 9999); // Get a reference to the last

    for (var i = 1; i < interval_id; i++) {
        window.clearInterval(i);
    }
    if (localStorage.getItem('jwt') != null) {
        if (to.matched.some(record => record.name == 'Login')) {
            next({ name: 'Home' })
        }
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {

            //let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.requiresAuth)) {
                next()
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router;