// utilities
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { FavoriteState } from "./types";
import { RootState } from "../types";

const favorites = window.localStorage.getItem("favorites");

export const state: FavoriteState = {
  favoriteCharacters: favorites ? JSON.parse(favorites) : []
};

const namespaced = true;

export const favoriteCharacters: Module<FavoriteState, RootState> = {
  state,
  namespaced,
  getters,
  mutations,
  actions
};
