<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>

    <!--        热门搜索-->
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <Scroll class="shortcut" :data="shortcut" ref="shortcutRef">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="(item, index) in hotKey"
                :key="index"
                @click="addQuery(item.first)"
              >
                <span>{{ item.first }}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="deleteAll">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <history-list
              :searches="searchHistory"
              @select="addQuery"
              @deleteOne="deleteOne"
            ></history-list>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest
        :query="query"
        @listScrollStart="ScrollStart"
        @select="saveSearch"
        ref="suggest"
      ></suggest>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getHotkey } from '@/views/search/api/request'
import { Dialog } from 'vant'
import Scroll from '@/components/common/scroll/Scroll.vue'
import SearchBox from '@/components/searchBox/SearchBox.vue'
import Suggest from '@/components/suggest/Suggest.vue'
import HistoryList from '@/components/historyList/HistoryList.vue'
import 'vant/es/dialog/style'
export default defineComponent({
  components: {
    Scroll,
    SearchBox,
    Suggest,
    HistoryList
  },
  setup() {
    const store = useStore()
    const hotKey = ref<Array<any>>([])
    const query = ref<string>('')
    const shortcutRef = ref()
    const searchBox = ref()

    getHotkey().then((res) => {
      if (res.code === 200) {
        hotKey.value = res.result.hots
      }
    })

    const shortcut = computed(() => {
      return hotKey.value.concat(store.getters['music/searchHistory'])
    })

    const searchHistory = computed(() => {
      return store.getters['music/searchHistory']
    })

    const onQueryChange = function (value: string) {
      query.value = value
    }
    //添加到搜索框里
    const addQuery = function (item: any) {
      searchBox.value.setQuery(item)
    }
    const ScrollStart = function () {
      searchBox.value.blur()
    }
    //保存搜索
    const saveSearch = function () {
      store.dispatch('music/saveSearchHistory', query.value)
    }
    const deleteOne = function (item: any) {
      store.dispatch('music/deleteSearchHistory', item)
    }
    //删除所有搜索历史
    const deleteAll = function () {
      Dialog.alert({
        title: '请确认',
        message: '是否删除全部历史',
        showCancelButton: true,
        closeOnPopstate: true
      })
        .then(() => {
          store.dispatch('music/clearSearchHistory')
        })
        .catch(() => {
          return
        })
    }

    watch(
      () => query.value,
      (newQuery) => {
        if (!newQuery) {
          setTimeout(() => {
            shortcutRef.value.refresh()
          }, 20)
        }
      }
    )
    return {
      hotKey,
      query,
      searchBox,
      shortcut,
      shortcutRef,
      addQuery,
      onQueryChange,
      ScrollStart,
      saveSearch,
      deleteOne,
      deleteAll,
      searchHistory
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: @font-size-medium;
          color: @color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            .extend-click();

            .icon-clear {
              font-size: @font-size-medium;
              color: @color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
