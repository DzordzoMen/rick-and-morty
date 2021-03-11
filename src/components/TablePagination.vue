<template>
  <div class="pagination">
    <div
      class="pagination-item"
      :class="shouldDisablePrevPageBtn && 'pagination-item__disabled'"
      @click="changePage(prevPage)"
    >
      <material-design-icon>
        arrow_left
      </material-design-icon>
    </div>
    <div class="pagination-item" v-if="hasFirst()" @click="changePage(1)">
      1
    </div>
    <div
      class="pagination-item pagination-item__disabled"
      v-if="shouldShowFirstDots"
    >
      ...
    </div>
    <template v-for="(page, index) in pages">
      <div
        :key="index"
        class="pagination-item"
        :class="currentPage === page && 'pagination-item__active'"
        @click="changePage(page)"
      >
        {{ page }}
      </div>
    </template>
    <div
      class="pagination-item pagination-item__disabled"
      v-if="shouldShowLastDots"
    >
      ...
    </div>
    <div
      class="pagination-item"
      v-if="hasLast()"
      @click="changePage(totalPages)"
    >
      {{ totalPages }}
    </div>
    <div
      class="pagination-item"
      @click="changePage(nextPage)"
      :class="shouldDisableNextPageBtn && 'pagination-item__disabled'"
    >
      <material-design-icon>
        arrow_right
      </material-design-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { PagedResult } from "@/typescript";

import MaterialDesignIcon from "@/components/MaterialDesignIcon.vue";

@Component({
  components: {
    MaterialDesignIcon
  }
})
export default class TablePagination extends Vue {
  @Prop({ required: true }) pagedResult!: PagedResult;
  @Prop({ required: true }) currentPage!: number;

  //#region computed

  get pages() {
    // eslint-disable-next-line
    let pages = [];
    const {
      rangeStart,
      rangeEnd
    }: {
      rangeStart: number;
      rangeEnd: number;
    } = this;

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    return pages;
  }

  get totalPages(): number {
    const {
      pagedResult: { pages }
    }: {
      pagedResult: PagedResult;
    } = this;

    return pages;
  }
  get rangeStart() {
    const { currentPage }: { currentPage: number } = this;

    const start = currentPage - 3;
    return start > 0 ? start : 1;
  }

  get rangeEnd() {
    const {
      currentPage,
      totalPages
    }: {
      currentPage: number;
      totalPages: number;
    } = this;
    const end = currentPage + 3;
    return end < totalPages ? end : totalPages;
  }

  get nextPage(): number {
    const { currentPage }: { currentPage: number } = this;

    return currentPage + 1;
  }

  get prevPage(): number {
    const { currentPage }: { currentPage: number } = this;

    return currentPage - 1;
  }

  get shouldShowFirstDots(): boolean {
    const { rangeStart }: { rangeStart: number } = this;
    const hasFirst: boolean = this.hasFirst();
    return hasFirst && rangeStart - 1 !== 1;
  }

  get shouldShowLastDots(): boolean {
    const {
      totalPages,
      rangeEnd
    }: {
      totalPages: number;
      rangeEnd: number;
    } = this;
    const hasLast: boolean = this.hasLast();

    return hasLast && totalPages - rangeEnd > 1;
  }

  get shouldDisablePrevPageBtn(): boolean {
    const { currentPage }: { currentPage: number } = this;
    return currentPage === 1;
  }

  get shouldDisableNextPageBtn(): boolean {
    const {
      currentPage,
      totalPages
    }: {
      currentPage: number;
      totalPages: number;
    } = this;

    return currentPage === totalPages;
  }

  //#endregion

  //#region methods

  hasFirst(): boolean {
    return this.rangeStart !== 1;
  }

  hasLast(): boolean {
    return this.rangeEnd < this.totalPages;
  }

  hasPrev(): boolean {
    const {
      pagedResult: { prev }
    }: {
      pagedResult: PagedResult;
    } = this;

    return !!prev;
  }

  hasNext(): boolean {
    const {
      pagedResult: { next }
    }: {
      pagedResult: PagedResult;
    } = this;

    return !!next;
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.$emit("pageChanged", page);
    }
  }

  //#endregion
}
</script>

<style lang="scss">
@import "../styles/_mixins.scss";

.pagination {
  margin: 16px 0;
  height: 48px;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;

  .pagination-item {
    @include textStyle(500, 24px);
    display: grid;
    place-items: center;
    color: $secondary;
    border: 1px solid $secondary;
    border-radius: 4px;
    width: 48px;
    height: 48px;
    transition: all 0.23s ease-in-out;
    cursor: pointer;

    span {
      color: $primary;
    }

    &__active {
      background-color: $primary;
      color: $background;
      cursor: default;
    }

    &__disabled {
      background-color: $background;
      cursor: default;
      color: $secondary;
      span {
        color: $secondary;
      }
    }

    &:not(.pagination-item__disabled):hover {
      background-color: $primary;
      color: $background;

      span {
        color: $background;
      }
    }
  }
}
</style>
