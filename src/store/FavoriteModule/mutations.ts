import { MutationTree } from "vuex";
import { FavoriteState } from "./types";
import { Character } from "@/typescript";

export const mutations: MutationTree<FavoriteState> = {
  ADD_NEW_FAVORITE({ favoriteCharacters }, character: Character): void {
    favoriteCharacters.push(character);
  },
  REMOVE_FROM_FAVORITE({ favoriteCharacters }, { id }: Character): void {
    const characterIndex = favoriteCharacters
      .map((mCharacter: Character) => mCharacter.id === id)
      .indexOf(true);

    favoriteCharacters.splice(characterIndex, 1);
  },
  SAVE_FAVORITES({ favoriteCharacters }): void {
    window.localStorage.setItem(
      "favorites",
      JSON.stringify(favoriteCharacters)
    );
  }
};
