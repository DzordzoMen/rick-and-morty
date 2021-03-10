import { Character, PagedResult } from "..";

export type Characters = {
  info: PagedResult;
  results: Character[];
};
