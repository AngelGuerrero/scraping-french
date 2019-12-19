import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/InputTextView.vue")
  }
  // {
  //   path: "/login",
  //   name: "login",
  // }
];

const router = new VueRouter({
  routes
});

export default router;
