<template>
  <Scroll
    class="suggest"
    :data="result"
    :pull-up="true"
    @scrollToEnd="searchMore"
    ref="suggest"
    :before-scroll="true"
    @beforeScroll="listScrollStart"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in result"
        @click="selectItem(item)"
        :key="index"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ item.name }}-{{ item.singer }}</p>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getSearchResult } from '@/components/suggest/api/request'
import { createSearchSong } from '@/utils/song'
import { Toast } from 'vant'
import Scroll from '@/components/common/scroll/Scroll.vue'
import 'vant/es/toast/style'
export default defineComponent({
  components: {
    Scroll
  },
  emits: ['select', 'listScrollStart'],
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const store = useStore()
    const page = ref<number>(0)
    const result = ref<Array<any>>([])
    const hasMore = ref<boolean>(true)
    const isShowLoading = ref<boolean>(false)

    const suggest = ref()

    const _normalizeSongs = function (list: Array<any>) {
      let ret: Array<any> = []
      list.forEach((musicData) => {
        ret.push(createSearchSong(musicData))
      })
      return ret
    }

    const _searchSong = function () {
      //当query改变时  要重新设置
      page.value = 1
      // suggest.value.scrollTo(0, 0)
      hasMore.value = true
      if (!props.query) {
        return
      }
      getSearchResult(props.query, page.value).then((res) => {
        hasMore.value = res.result.hasMore
        result.value = _normalizeSongs(res.result.songs)
        if (!result.value.length) {
          Toast({
            message: '抱歉，暂无搜索结果',
            icon: 'cross'
          })
        }
      })
    }
    //上啦加载更多
    const searchMore = function () {
      isShowLoading.value = true
      if (!hasMore.value) {
        isShowLoading.value = false
        return
      }
      page.value++
      getSearchResult(props.query, page.value).then((res) => {
        result.value.push(..._normalizeSongs(res.result.songs))
        isShowLoading.value = false
        refresh()
      })
    }

    //    选中
    const selectItem = function (item: any) {
      store.dispatch('music/insertSong', item)
      context.emit('select')
    }
    //开始触摸scroll
    const listScrollStart = function () {
      context.emit('listScrollStart')
    }
    const refresh = function () {
      suggest.value.refresh()
    }
    watch(
      () => props.query,
      () => {
        _searchSong()
      }
    )
    return {
      page,
      result,
      hasMore,
      isShowLoading,
      suggest,
      searchMore,
      selectItem,
      listScrollStart,
      refresh
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        .icon-music {
          font-size: 14px;
          color: @color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: @font-size-medium;
        color: @color-text-d;
        overflow: hidden;

        .text {
          .no-wrap();
        }
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .loading {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
