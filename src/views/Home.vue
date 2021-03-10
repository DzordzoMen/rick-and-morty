<template>
  <div class="home">
    <characters-table
      :characters="charactersInfo || []"
      :pagedResult="dataInfo || {}"
    />
    <table-pagination
      v-if="dataInfo.pages > 1"
      :pagedResult="dataInfo || {}"
      :currentPage="currentPage"
      @pageChanged="updateCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CharactersTable from "@/components/CharactersTable.vue";
import TablePagination from "@/components/TablePagination.vue";
import CharactersQuery from "@/queries/ts/Characters";
import CharacterByIdQuery from "@/queries/ts/CharacterById";
import CharactersByEpisodeQuery from "@/queries/ts/CharactersByEpisode";
import { Character, PagedResult } from "@/typescript";

@Component({
  components: {
    CharactersTable,
    TablePagination
  },
  apollo: {
    characters: {
      query() {
        const { filterType } = this;
        switch (filterType) {
          case "Name":
            return CharactersQuery;
          case "Identifier":
            return CharacterByIdQuery;
          case "Episode":
            return CharactersByEpisodeQuery;
          default:
            return CharactersQuery;
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
export default class Home extends Vue {
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
  updateCurrentPage(newPage: number) {
    this.currentPage = newPage;
  }
}
</script>
