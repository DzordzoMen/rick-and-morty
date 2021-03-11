<template>
  <div id="app">
    <nav-bar />
    <div class="navigation-area">
      <router-link to="/" custom v-slot="{ navigate }">
        <span
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="navigation-button"
          :class="routeIsActive('Characters') && 'navigation-button__active'"
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
          :class="routeIsActive('Favorites') && 'navigation-button__active'"
        >
          Favorites
        </span>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";

import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  routeIsActive(routeName: string): boolean {
    return this.$route.matched.some(({ name }) => name === routeName);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --primary-color: hsla(188, 84%, 43%, 1);
  --secondary-color: hsla(216, 13%, 70%, 1);
  --background-color: hsla(0, 0%, 100%, 1);
  font-family: Poppins, Arial, sans-serif;
}
html {
  background: #fff;
}
button:focus,
input:focus {
  outline: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.navigation-area {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 48px;
  padding: 24px 0;
  max-width: 1185px;
  margin: auto;
}
.navigation-button {
  color: var(--primary-color);
  font-weight: 500;
  cursor: pointer;
}
.navigation-button__active {
  border-bottom: 3px solid var(--primary-color);
}
</style>
