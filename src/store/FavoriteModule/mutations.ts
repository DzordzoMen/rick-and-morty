import { MutationTree } from "vuex";
import { FavoriteState } from "./types";
import { Character } from "@/typescript";

export const mutations: MutationTree<FavoriteState> = {
  ADD_NEW_FAVORITE(state, character: Character): void {
    state.favoriteCharacters.push(character);
  },
  // TODO use destructuring to take character ID
  REMOVE_FROM_FAVORITE(state, character: Character): void {
    const { favoriteCharacters }: { favoriteCharacters: Character[] } = state;
    const characterIndex = favoriteCharacters
      .map((mCharacter: Character) => mCharacter.id === character.id)
      .indexOf(true);

    favoriteCharacters.splice(characterIndex, 1);
  },
  SAVE_FAVORITES(state): void {
    window.localStorage.setItem(
      "favorites",
      JSON.stringify(state.favoriteCharacters)
    );
  }
};
