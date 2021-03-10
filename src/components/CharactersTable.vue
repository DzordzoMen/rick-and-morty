<template>
  <table>
    <thead>
      <tr>
        <th :key="index" v-for="(headerName, index) in tableHeaders">
          {{ headerName }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="character in characters">
        <tr :key="character.id">
          <td>
            <img :src="character.image" :alt="character.name" />
          </td>
          <td>{{ character.id }}</td>
          <td>{{ character.name }}</td>
          <td>
            <div class="gender-wrapper">
              <material-design-icon>
                {{ setGenderIcon(character) }}
              </material-design-icon>
              {{ character.gender }}
            </div>
          </td>
          <td>{{ character.species }}</td>
          <td>{{ displayCharacterLastEpisode(character) }}</td>
          <td>
            <button
              @click="addCharacterToFavorites(character)"
              :class="
                checkIfCharacterIsAlreadyFavorite(character) && 'is-favorite'
              "
            >
              <material-design-icon>
                grade
              </material-design-icon>
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Character, PagedResult, Gender, Episode } from "@/typescript";

import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

@Component({
  components: {
    MaterialDesignIcon
  }
})
export default class CharactersTable extends Vue {
  @Prop({ required: false }) characters!: Character[];
  @Prop({ required: false }) pagedResult!: PagedResult;

  tableHeaders: string[] = [
    "Photo",
    "Character ID",
    "Name",
    "Gender",
    "Species",
    "Last Episode",
    "Add to Favorites"
  ];

  setGenderIcon({ gender }: { gender: Gender }): string {
    switch (gender) {
      case Gender.Female:
        return "female";
      case Gender.Male:
        return "male";
      case Gender.Genderless:
        return "close";
      case Gender.unknown:
        return "remove";
      default:
        return "remove";
    }
  }

  displayCharacterLastEpisode({ episode }: { episode: Episode[] }): string {
    const lastEpisode = episode?.reduce((acc: Episode, episode: Episode) => {
      if (Number(episode.id) > Number(acc?.id)) acc = episode;
      return acc;
    });
    return lastEpisode?.episode;
  }

  checkIfCharacterIsAlreadyFavorite(character: Character): boolean {
    return this.$store.getters["favorite/IS_FAVORITE"]({ character });
  }

  addCharacterToFavorites(character: Character): void {
    if (this.checkIfCharacterIsAlreadyFavorite(character)) {
      this.$store.dispatch("favorite/REMOVE_FAVORITE", character);
    } else {
      this.$store.dispatch("favorite/SET_FAVORITE", character);
    }
  }
}
</script>

<style>
@media (min-width: 960px) {
  table {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  table {
    max-width: 1185px;
  }
}
table {
  width: 100%;
  margin: auto;
  font-size: 16px;
  color: var(--secondary-color);
}
table thead {
  background: rgba(229, 234, 244, 0.25);
}
thead tr {
  height: 54px;
}
thead tr th {
  /* padding: 12px 0px; */
  font-weight: 500;
  line-height: 22px;
  font-style: normal;
  text-align: left;
  /* TODO CALCULATE BASED ON HEADERS LENGTH */
  width: calc(100% / 7);
}
tbody tr td {
  font-weight: 400;
  text-align: left;
}
table img {
  width: 43px;
  height: 68px;
  /* mix-blend-mode: luminosity; */
}
table button {
  padding: 10px;
  display: grid;
  place-items: center;
  /* margin: auto; */
  border-radius: 8px;
  border: 2px solid var(--primary-color);
  background: var(--background-color);
  transition: all 0.23s ease-in-out;
}
button span {
  color: var(--primary-color);
  transition: all 0.23s ease-in-out;
}
button:hover {
  cursor: pointer;
}
.gender-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
}
.is-favorite {
  background: var(--primary-color);
}
.is-favorite span {
  color: var(--background-color);
}
</style>
