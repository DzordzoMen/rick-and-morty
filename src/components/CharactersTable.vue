<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            :key="index"
            v-for="(headerName, index) in headers"
            :style="{ width: `calc(100% / ${headers.length})` }"
          >
            {{ headerName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="character in characters">
          <tr :key="character.id">
            <td>
              <div
                role="img"
                :aria-label="character.name"
                class="character-image"
                :class="isDead(character) && 'character-image__dead'"
                :style="{ backgroundImage: `url(${character.image})` }"
              >
                <ribbon v-if="isDead(character)" />
              </div>
            </td>
            <td>{{ character.id }}</td>
            <td>{{ character.name }}</td>
            <td>
              <div class="gender-wrapper">
                <material-design-icon>
                  {{ genderIcon(character) }}
                </material-design-icon>
                {{ character.gender }}
              </div>
            </td>
            <td>{{ character.species }}</td>
            <td>{{ lastEpisode(character) }}</td>
            <td>
              <button
                @click="addToFavoriteCharacters(character)"
                :class="isFavorite(character) && 'is-favorite'"
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
    <pagination
      v-if="pagedResult && pagedResult.pages > 1"
      :pagedResult="pagedResult"
      :currentPage="currentPage"
      @pageChanged="updatePagination"
    />
  </div>
</template>

<script lang="ts">
// utilities
import { Component, Prop, Vue } from "vue-property-decorator";
import { Character, PagedResult, Gender, Status, Episode } from "@/typescript";
// components
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import Pagination from "@/components/Pagination.vue";
import Ribbon from "@/components/svgComponents/Ribbon.vue";

@Component({
  components: {
    MaterialDesignIcon,
    Pagination,
    Ribbon
  }
})
export default class CharactersTable extends Vue {
  //#region props

  @Prop({ required: true }) characters!: Character[];
  @Prop({ required: true }) headers!: string[];
  @Prop({ required: false }) pagedResult!: PagedResult;
  @Prop({ required: false }) currentPage!: number;
  @Prop({ required: false }) updatePagination!: Function;

  //#endregion

  //#region methods

  genderIcon({ gender }: Character): string {
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

  lastEpisode({ episode }: Character): string {
    const lastEpisode = episode?.reduce((acc: Episode, episode: Episode) => {
      if (Number(episode.id) > Number(acc?.id)) acc = episode;
      return acc;
    });
    return lastEpisode?.episode;
  }

  isFavorite(character: Character): boolean {
    return this.$store.getters["favorite/IS_FAVORITE"]({ character });
  }

  addToFavoriteCharacters(character: Character): void {
    if (this.isFavorite(character)) {
      this.$store.dispatch("favorite/REMOVE_FAVORITE", character);
    } else {
      this.$store.dispatch("favorite/SET_FAVORITE", character);
    }
  }

  isDead({ status }: Character): boolean {
    return status === Status.Dead;
  }

  //#endregion
}
</script>

<style lang="scss">
@import "../styles/_mixins.scss";

table {
  width: 100%;
  font-size: 16px;
  color: $secondary;
  border-collapse: collapse;
  text-align: left;

  thead {
    background: rgba(229, 234, 244, 0.25);

    tr {
      height: 54px;
      white-space: nowrap;
      th {
        @include textStyle(500, 22px);
        padding: 0 8px;
      }
    }
  }

  tbody {
    tr {
      padding: 4px 0;
      border-bottom: 1px solid hsla(220, 41%, 93%, 1);
    }

    td {
      @include textStyle(400, 22px);
      padding: 0 8px;

      .is-favorite {
        background: $primary;
        span {
          color: $background;
        }
      }

      .gender-wrapper {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 4px;
      }
    }
  }

  button {
    padding: 10px;
    display: grid;
    place-items: center;
    border-radius: 8px;
    border: 2px solid $primary;
    background: $background;
    transition: all 0.23s ease-in-out;

    &:hover {
      cursor: pointer;
    }

    span {
      color: $primary;
      transition: all 0.23s ease-in-out;
    }
  }

  .character-image {
    width: 50px;
    height: 75px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    margin: 4px auto 4px 0;

    &__dead {
      mix-blend-mode: luminosity;
    }

    & > svg {
      position: absolute;
      top: -5%;
      right: -30%;
    }
  }
}
</style>
