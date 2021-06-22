import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/code",
    name: "Code",
    component: () => import("../views/VisualCode.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
