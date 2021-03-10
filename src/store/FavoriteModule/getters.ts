import { Character } from "@/typescript";
import { GetterTree } from "vuex";
import { RootState } from "../types";
import { FavoriteState } from "./types";

export const getters: GetterTree<FavoriteState, RootState> = {
  FAVORITE_CHARACTERS: ({ favoriteCharacters }): Character[] =>
    favoriteCharacters,
  IS_FAVORITE: ({ favoriteCharacters }) => ({
    character
  }: {
    character: Character;
  }): boolean => {
    const { id } = character;
    return favoriteCharacters
      .map((character: Character) => character.id === id)
      .includes(true);
  }
};
