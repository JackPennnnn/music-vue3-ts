<template>
  <Scroll
    class="listview"
    :data="data"
    ref="listView"
    :listenScroll="listenScroll"
    :probe-type="probeType"
  >
    <!--        歌手列表-->
    <ul class="list-group">
      <li
        v-for="item in data"
        :key="item.id"
        class="list-group-item"
        @click="selectItem(item)"
      >
        <img :src="item.avatar" alt="" class="avatar" />
        <span class="name">{{ item.name }}</span>
      </li>
    </ul>
  </Scroll>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import { singerType } from '@/utils/singer'

export default defineComponent({
  components: {
    Scroll
  },
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const listenScroll = ref<boolean>(true)
    const probeType = ref<number>(3)
    const listView = ref()

    const selectItem = function (item: singerType) {
      context.emit('select', item)
    }

    const refresh = function () {
      listView.value.refresh()
    }
    return {
      listView,
      probeType,
      listenScroll,
      selectItem,
      refresh
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-text-l;
        font-size: @font-size-medium;
      }
    }
  }
}
</style>
