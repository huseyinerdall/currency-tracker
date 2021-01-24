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
// Admin Side
function toCapitalize(str){
    str = str.split('-')
        .map(w => w[0].toLocaleUpperCase('tr-TR') + w.substr(1).toLocaleLowerCase('tr-TR'))
        .join(' ');
    return str;
}
Vue.use(VueRouter);

const routes = [{
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
        path: "/kripto-paralar/:coin",
        name: "Coins",
        component: Coins,
        meta: {
            requiresAuth: false
        },
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
        props(route) { // <-- props as a Function
            return { gold: toCapitalize(route.params.gold).split('-').join(' ') };
        },
    },
    {
        path: "/doviz-kurlari/:gold",
        name: "Currencies",
        component: Golds,
        meta: {
            requiresAuth: false
        },
        props(route) { // <-- props as a Function
            return { gold: route.params.gold.toLocaleUpperCase('tr-TR').split('-').join(' ') };
        },
    },
    {
        path: "/wallet",
        name: "Wallet",
        component: Wallet,
        meta: {
            requiresAuth: true
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
    /*if (localStorage.getItem('jwt') != null) {
        if (to.matched.some(record => record.name == 'Login')) {
            next({ name: 'Home' })
        }
    }*/

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {

            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            if (to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin){
                    next()
                }
                else{
                    next()
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({name:"Home"})
        }
    } else {
        next()
    }
})


export default router;