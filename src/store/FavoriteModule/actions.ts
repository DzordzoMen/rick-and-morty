import { Character } from "@/typescript";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import { FavoriteState } from "./types";

export const actions: ActionTree<FavoriteState, RootState> = {
  SET_FAVORITE({ commit }, character: Character): void {
    commit("ADD_NEW_FAVORITE", character);
    commit("SAVE_FAVORITES");
  },
  REMOVE_FAVORITE({ commit }, character: Character): void {
    commit("REMOVE_FROM_FAVORITE", character);
    commit("SAVE_FAVORITES");
  }
};
