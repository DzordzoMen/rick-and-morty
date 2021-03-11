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

<style lang="scss">
@media only screen and (min-device-width: 320px) and (max-device-width: 769px) {
  .container {
    padding: 0 12px;
  }
}

@media only screen and (min-device-width: 770px) and (max-device-width: 1024px) {
  .container {
    padding: 0 140px;
  }
}
@media screen and (min-device-width: 1200px) {
  .container {
    padding: 0 140px;
  }
}

.container {
  margin: auto;
  overflow: auto;
  width: 100%;
}
</style>
