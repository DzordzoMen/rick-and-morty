<template>
  <container>
    <characters-table
      :characters="charactersInfo || []"
      :headers="tableHeaders"
      :pagedResult="dataInfo || {}"
      :currentPage="currentPage"
      :updatePagination="updateCurrentPage"
    />

    <div class="no-search-result" v-if="error">
      No search results
    </div>
  </container>
</template>

<script lang="ts">
// utilities
import { Component, Vue } from "vue-property-decorator";
import { Character, PagedResult } from "@/typescript";
// components
import CharactersTable from "@/components/CharactersTable.vue";
import Container from "@/components/Container.vue";
// queries
import Characters from "@/queries/Characters.graphql";
import CharacterById from "@/queries/CharacterById.graphql";
import CharactersByEpisode from "@/queries/CharactersByEpisode.graphql";

@Component({
  components: {
    CharactersTable,
    Container
  },
  apollo: {
    characters: {
      query() {
        const { filterType } = this;
        switch (filterType) {
          case "Name":
            return Characters;
          case "Identifier":
            return CharacterById;
          case "Episode":
            return CharactersByEpisode;
          default:
            return Characters;
        }
      },
      variables() {
        return {
          page: this.currentPage as number,
          filterValue: this.filterValue as string | number
        };
      },
      update: () => ({ characters: [] as Character[] }),
      error() {
        this.error = true;
        this.dataInfo = {
          count: 0,
          pages: 0
        };
        this.charactersInfo = [];
      },
      result({ data, loading }) {
        const { filterType } = this;

        if (!loading && !!data) {
          this.error = false;

          switch (filterType) {
            case "Name":
              this.dataInfo = data.characters.info;
              this.charactersInfo = data.characters.results;
              break;
            case "Identifier":
              this.dataInfo = {
                count: 0,
                pages: 0
              };
              this.charactersInfo = [data.character];
              break;
            case "Episode":
              this.dataInfo = data.episodes.info;
              this.charactersInfo = data.episodes.results[0].characters;
              break;
            default:
              this.dataInfo = data.characters.info;
              this.charactersInfo = data.characters.results;
              break;
          }
        }
      }
    }
  }
})
export default class CharactersView extends Vue {
  //#region data

  error = false;

  currentPage = 1;

  dataInfo: PagedResult = {
    count: 0,
    pages: 0
  };

  charactersInfo: Character[] = [];

  tableHeaders: string[] = [
    "Photo",
    "Character ID",
    "Name",
    "Gender",
    "Species",
    "Last Episode",
    "Add to Favorites"
  ];

  //#endregion

  //#region computed

  get filterType(): string {
    return this.$store.getters["FILTER_TYPE"];
  }

  get filterValue(): string {
    return this.$store.getters["FILTER_VALUE"];
  }

  //#endregion

  //#region methods

  updateCurrentPage(newPage: number) {
    this.currentPage = newPage;
  }

  //#endregion
}
</script>

<style lang="scss">
@import "../styles/_mixins.scss";

.no-search-result {
  @include textStyle(500, 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  color: $secondary;
}
</style>
