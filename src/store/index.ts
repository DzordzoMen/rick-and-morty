import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { favoriteCharacters } from "./FavoriteModule/index";
import { filter } from "./FilterModule/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },
  modules: {
    favorite: favoriteCharacters,
    filter
  }
};

export default new Vuex.Store<RootState>(store);
