<template>
  <div class="search-list" v-show="searches.length">
    <ul>
      <li
        class="search-item"
        v-for="(item, index) in searches"
        :key="index"
        @click="selectItem(item)"
      >
        <span class="text">{{ item }}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['select', 'deleteOne'],
  props: {
    searches: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const selectItem = function (item: any) {
      context.emit('select', item)
    }
    //删除一个
    const deleteOne = function (item: any) {
      context.emit('deleteOne', item)
    }
    return {
      selectItem,
      deleteOne
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;

    &.list-enter-active,
    &.list-leave-active {
      transition: all 0.1s;
    }

    &.list-enter,
    &.list-leave-to {
      height: 0;
    }

    .text {
      flex: 1;
      color: @color-text-l;
    }

    .icon {
      .extend-click();

      .icon-delete {
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
  }
}
</style>
