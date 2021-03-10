import { GetterTree } from "vuex";
import { RootState } from "../types";
import { FilterState } from "./types";

export const getters: GetterTree<FilterState, RootState> = {
  FILTER_TYPE: ({ filterType }): string => filterType,
  FILTER_VALUE: ({ filterValue }): string => filterValue
};
