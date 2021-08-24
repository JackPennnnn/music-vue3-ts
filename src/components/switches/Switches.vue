<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item, index) in switches"
      :key="index"
      :class="{ active: currentIndex === index }"
      @click="switchItem(index)"
    >
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['switch'],
  props: {
    switches: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const switchItem = function (index: number) {
      context.emit('switch', index)
    }
    return {
      switchItem
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';

.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid @color-highlight-background;
  border-radius: 5px;

  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: @font-size-medium;
    color: @color-text-d;

    &.active {
      background: @color-highlight-background;
      color: @color-text;
    }
  }
}
</style>
