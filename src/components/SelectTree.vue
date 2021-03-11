<template>
  <div class="select" role="tree" @click="showOptions()">
    <div class="select__selected">
      <slot name="selected" :selected="value">
        {{ value }}
      </slot>
    </div>
    <slot name="icon">
      <material-design-icon
        class="select__icon"
        :class="optionsMenu && 'select__icon-animation'"
      >
        arrow_left
      </material-design-icon>
    </slot>
    <div class="options" role="presentation" v-if="optionsMenu">
      <template v-for="(item, index) in items">
        <div
          :key="index"
          class="options__item"
          :class="item === value && 'options__item-selected'"
          role="treeitem"
          @click="selectItem(item)"
        >
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
// utilities
import { Component, Prop, Vue } from "vue-property-decorator";
// components
import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

@Component({
  components: {
    MaterialDesignIcon
  }
})
export default class SelectTree extends Vue {
  //#region props

  @Prop({ required: true, default: [] }) items!: string[];
  @Prop({ required: true, default: "" }) value!: string;

  //#endregion

  //#region data

  optionsMenu = false;

  //#endregion

  //#region methods

  showOptions(): void {
    this.optionsMenu = !this.optionsMenu;
  }

  selectItem(selectedItem: string): void {
    this.$emit("input", selectedItem);
  }

  //#endregion
}
</script>

<style lang="scss">
@import "../styles/_mixins.scss";

.select {
  display: flex;
  height: 100%;
  padding: 8px;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  position: relative;
  user-select: none;
  cursor: pointer;

  &__selected {
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: start;
    @include textStyle(500, 24px);
  }

  &__icon {
    transition: all 0.23s ease-in-out;

    &-animation {
      transform: rotate(-90deg);
    }
  }

  .options {
    background-color: $background;
    width: 100%;
    box-sizing: content-box;
    border: 1px solid $secondary;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    position: absolute;
    top: 100%;
    left: -1px;
    right: -1px;
    z-index: 5;

    &__item {
      @include textStyle(500, 24px);
      text-align: start;
      padding: 16px;

      &:hover {
        cursor: pointer;
        background-color: $primary;
        color: $background;
      }

      &:nth-child(n) {
        border-bottom: 1px solid $secondary;
      }

      &:last-child {
        border: none;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;

        &:hover {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }

      &-selected {
        background-color: $primary;
        color: $background;
      }
    }
  }
}
</style>
