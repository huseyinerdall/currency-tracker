import VueRouter from "vue-router";
import routes from "./routes";

// configure router
const router = new VueRouter({
  mode: "history",
  base: "/administrator/",
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {

  if (localStorage.getItem('admin') != null) {
      if (to.matched.some(record => record.name == 'login')) {
          next({ name: 'dashboard' })
      }
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('admin') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {

      let user = JSON.parse(localStorage.getItem('admin'));
      if (to.matched.some(record => record.meta.is_admin)) {
        next();
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router;
