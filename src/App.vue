<template>
  <div id="app">
    <nav-bar />
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
export default class App extends Vue {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --primary-color: hsl(188, 84%, 43%);
  --secondary-color: hsl(216, 13%, 70%);
  --background-color: hsl(0, 0%, 100%);
  font-family: Poppins, Arial, sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
