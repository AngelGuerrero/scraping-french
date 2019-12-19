import Vue from "vue";
import VueRouter from "vue-router";
//
// Views components
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/input",
    name: "input",
    component: () => import("../views/InputTextView.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
