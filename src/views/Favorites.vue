<template>
  <container>
    <characters-table :characters="characters" :headers="tableHeaders" />
  </container>
</template>

<script lang="ts">
// utilities
import { Vue, Component } from "vue-property-decorator";
import { Character } from "@/typescript";
// components
import Container from "@/components/Container.vue";
import CharactersTable from "@/components/CharactersTable.vue";

@Component({
  components: {
    Container,
    CharactersTable
  }
})
export default class FavoritesView extends Vue {
  //#region data

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

  get characters(): Character[] {
    return this.$store.getters["favorite/FAVORITE_CHARACTERS"];
  }

  //#endregion
}
</script>
