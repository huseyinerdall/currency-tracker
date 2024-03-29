import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Seo = () => import(/* webpackChunkName: "common" */ "@/pages/Seo.vue");
const Login = () => import(/* webpackChunkName: "common" */ "@/pages/Login.vue");
const Users = () => import(/* webpackChunkName: "common" */ "@/pages/Users.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "seo",
        name: "seo",
        component: Seo,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "login",
        name: "login",
        component: Login,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: "users",
        name: "users",
        component: Users,
        meta: {
          requiresAuth: false
        }
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
