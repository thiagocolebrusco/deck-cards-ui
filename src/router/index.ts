import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AddDeck from "../views/AddDeck.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/deck/new",
    name: "AddDeck",
    component: AddDeck,
  },
  {
    path: "/deck/:deck_id",
    name: "AddDeck",
    component: AddDeck,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
