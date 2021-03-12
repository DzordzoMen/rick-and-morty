<template>
  <div id="app">
    <nav-bar />
    <nav class="navigation-area" aria-label="Secondary">
      <router-link to="/" custom v-slot="{ navigate }">
        <span
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="navigation-button"
          :class="isRouteActive('Characters') && 'navigation-button__active'"
        >
          All Characters
        </span>
      </router-link>
      <router-link to="/favorites" custom v-slot="{ navigate }">
        <span
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="navigation-button"
          :class="isRouteActive('Favorites') && 'navigation-button__active'"
        >
          Favorites
        </span>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
// utilities
import { Component, Vue } from "vue-property-decorator";
// components
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  //#region methods

  isRouteActive(routeName: string): boolean {
    return this.$route.matched.some(({ name }) => name === routeName);
  }

  //#endregion
}
</script>

<style lang="scss">
@import "./styles/_mixins.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Poppins, sans-serif;
}
html {
  background: $background;
}
button:focus,
input:focus {
  outline: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 769px) {
  .navigation-area {
    padding: 24px;
  }
}

@media only screen and (min-device-width: 770px) and (max-device-width: 1024px) {
  .navigation-area {
    padding: 24px 140px;
  }
}
@media screen and (min-device-width: 1200px) {
  .navigation-area {
    padding: 24px 140px;
  }
}

.navigation-area {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 48px;
  width: 100%;
  margin: auto;

  .navigation-button {
    @include textStyle(500, 24px);
    color: $primary;
    cursor: pointer;

    &__active {
      border-bottom: 3px solid $primary;
    }
  }
}
</style>
