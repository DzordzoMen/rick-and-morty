import { MutationTree } from "vuex";
import { FilterState } from "./types";

export const mutations: MutationTree<FilterState> = {
  CHANGE_FILTER_TYPE(state, newType: string): void {
    state.filterType = newType;
  },
  CHANGE_FILTER_VALUE(state, newValue: string): void {
    state.filterValue = newValue;
  }
};
