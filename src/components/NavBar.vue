<template>
  <nav>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
      class="logo"
      alt="Rick and morty logo"
    />
    <div class="search-bar">
      <div class="search-bar__item">
        Search By
      </div>
      <div class="search-bar__item">
        <search-bar-select
          v-model="selected"
          :items="availableFilterOptions"
          :selected="selected"
        />
      </div>
      <div class="search-bar__item">
        <input type="text" v-model="inputValue" />
        <button @click="search()">
          <material-design-icon>
            search
          </material-design-icon>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";
import SearchBarSelect from "@/components/SearchBarSelect.vue";

@Component({
  components: {
    MaterialDesignIcon,
    SearchBarSelect
  }
})
export default class NavBar extends Vue {
  userInputValue = "";
  selected = "Name";
  availableFilterOptions: string[] = ["Name", "Identifier", "Episode"];

  get inputValue(): string {
    return this.$store.getters["FILTER_VALUE"];
  }

  set inputValue(newValue: string) {
    this.userInputValue = newValue;
  }

  search(): void {
    const { userInputValue: newValue, selected: newType } = this;

    this.$store.commit("CHANGE_FILTER_VALUE", newValue);
    this.$store.commit("CHANGE_FILTER_TYPE", newType);
  }
}
</script>

<style lang="scss">
/* TODO DEBUG */
@media (min-width: 960px) {
  .logo {
    max-width: 150px;
  }
}
@media (min-width: 1264px) {
  .logo {
    max-width: 300px;
  }
}
nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 64px;
  max-width: 1185px;
  margin: auto;
  height: 134px;
  padding: 24px;
  font-size: 16px;
  z-index: 2;
  place-items: center;
  position: sticky;
  top: 0;
  background-color: $background;
  border-bottom: 1px solid $secondary;

  .logo {
    width: 300px;
  }

  .search-bar {
    height: 56px;
    width: 505px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    border: 1px solid $secondary;
    border-radius: 8px;

    &__item {
      border-right: 1px solid $secondary;
      color: $secondary;
      display: flex;
      justify-content: center;
      line-height: 24px;
      font-weight: 500;
      gap: 4px;
      align-items: center;
      width: 25%;
      height: 100%;

      &:last-child {
        width: 50%;
        border-right: none;
      }

      input {
        border: none;
        height: inherit;
        width: 75%;
        padding: 8px;
      }

      button {
        padding: 8px;
        display: grid;
        place-items: center;
        color: $primary;
        border: none;
        background-color: inherit;
        margin: auto;
      }
    }
  }
}
</style>
