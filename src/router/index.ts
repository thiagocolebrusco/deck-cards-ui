import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AddDeck from "../views/AddDeck.vue";
import ViewDeck from "../views/ViewDeck.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/deck/new",
    name: "AddDeck",
    component: AddDeck,
  },
  {
    path: "/deck/:deckId",
    name: "ViewDeck",
    component: ViewDeck,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
