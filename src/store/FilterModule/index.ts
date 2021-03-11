// utilities
import { Module } from "vuex";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { FilterState } from "./types";
import { RootState } from "../types";

export const state: FilterState = {
  filterType: "Name",
  filterValue: ""
};

const namespaced = false;

export const filter: Module<FilterState, RootState> = {
  state,
  namespaced,
  getters,
  mutations
};
