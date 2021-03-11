<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>

<style>
@media (min-width: 960px) {
  .container {
    max-width: 900px;
  }
}
@media (min-width: 1264px) {
  .container {
    max-width: 1185px;
  }
}
.container {
  margin: auto;
  width: 100%;
}
</style>
