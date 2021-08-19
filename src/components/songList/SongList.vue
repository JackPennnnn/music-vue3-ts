<template>
  <div class="song-list">
    <ul>
      <li
        v-for="(song, index) in songs"
        class="item"
        @click="selectItem(song, index)"
        :key="index"
      >
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { song } from '@/utils/song'

export default defineComponent({
  emits: ['select'],
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  setup(props, context) {
    const getDesc = function (song: song) {
      return `${song.singer} - ${song.album}`
    }
    const selectItem = function (song: song, index: number) {
      context.emit('select', song, index)
    }
    return {
      getDesc,
      selectItem
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: @font-size-medium;
  }

  .content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;

    .name {
      .no-wrap();
      color: white;
    }

    .desc {
      .no-wrap();
      margin-top: 4px;
      color: gray;
    }
  }
}
</style>
