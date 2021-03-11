<template>
  <container>
    <characters-table
      :characters="charactersInfo || []"
      :headers="tableHeaders"
      :pagedResult="dataInfo || {}"
      :currentPage="currentPage"
      :updatePagination="updateCurrentPage"
    />
  </container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Character, PagedResult } from "@/typescript";

import CharactersTable from "@/components/CharactersTable.vue";
import Container from "@/components/Container.vue";

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
      result({ data, loading }) {
        const { filterType } = this;

        if (!loading) {
          switch (filterType) {
            case "Name":
              this.dataInfo = data.characters.info;
              this.charactersInfo = data.characters.results;
              break;
            case "Identifier":
              this.dataInfo = {
                count: 0,
                pages: 0,
                next: 0,
                prev: 0
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
  currentPage = 1;

  get filterType(): string {
    return this.$store.getters["FILTER_TYPE"];
  }

  get filterValue(): string {
    return this.$store.getters["FILTER_VALUE"];
  }

  dataInfo: PagedResult = {
    count: 0,
    pages: 0,
    next: 0, // TOOD MAKE NULLABLE
    prev: 0 // TOOD MAKE NULLABLE
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

  updateCurrentPage(newPage: number) {
    this.currentPage = newPage;
  }
}
</script>
