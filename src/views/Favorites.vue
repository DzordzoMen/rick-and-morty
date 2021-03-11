<template>
  <container>
    <characters-table :characters="characters" :headers="tableHeaders" />
  </container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Character } from "@/typescript";
import Container from "@/components/Container.vue";
import CharactersTable from "@/components/CharactersTable.vue";

@Component({
  components: {
    Container,
    CharactersTable
  }
})
export default class FavoritesView extends Vue {
  get characters(): Character[] {
    return this.$store.getters["favorite/FAVORITE_CHARACTERS"];
  }

  tableHeaders: string[] = [
    "Photo",
    "Character ID",
    "Name",
    "Gender",
    "Species",
    "Last Episode",
    "Add to Favorites"
  ];
}
</script>
