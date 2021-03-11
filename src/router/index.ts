// utilities
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// views
import CharactersView from "../views/Characters.vue";
import FavoritesView from "@/views/Favorites.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Characters",
    component: CharactersView
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
