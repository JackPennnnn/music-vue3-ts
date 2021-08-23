<template>
  <transition name="list-fade" appear>
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click.stop="changeMode"></i>
            <!--            <span class="text">{{ toast[mode] }}</span>-->
            <span class="clear" @click="clearAll"
              ><i class="icon-clear"></i
            ></span>
          </h1>
        </div>
        <scroll class="list-content" :data="sequenceList" ref="listContent">
          <!--                    tag代表渲染成什么  一定要加key-->
          <transition-group name="list" tag="ul">
            <li
              ref="listItem"
              class="item"
              v-for="(item, index) in sequenceList"
              @click="selectItem(item, index)"
              :key="item.id"
            >
              <i class="current" :class="getCurrentItem(item)"></i>
              <span class="text">{{ item.name }} - {{ item.singer }}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import { playMode } from '@/common/js/config'
import { xipai } from '@/utils/utils'
import Scroll from '@/components/common/scroll/Scroll.vue'
import { mapGetters } from '@/utils/store'
import { song } from '@/utils/song'
import { playerHook } from '@/hooks/playerHook'

export default defineComponent({
  components: {
    Scroll
  },
  setup() {
    const store = useStore()
    const showFlag = ref<boolean>(false)
    const { playList, currentSong, mode, sequenceList } = mapGetters('music')
    const listContent = ref()
    const listItem = ref()
    const iconMode = computed(() => {
      return mode.value === playMode.sequence
        ? 'icon-sequence'
        : mode.value === playMode.loop
        ? 'icon-loop'
        : 'icon-random'
    })
    const { getFavoriteIcon, toggleFavorite } = playerHook()
    const scrollToCurrent = function (current: song) {
      const index = sequenceList.value.findIndex((song: song) => {
        return current.id === song.id
      })
      if (!playList.value.length) {
        return
      }
      listContent.value.scrollElement(listItem.value[index])
    }

    const show = function () {
      showFlag.value = true
      //显示后，渲染完要重新计算
      nextTick(() => {
        listContent.value.refresh()
        scrollToCurrent(currentSong.value)
      })
    }

    const hide = function () {
      showFlag.value = false
    }
    //找到当前播放位置
    const getCurrentItem = function (item: any): string {
      if (currentSong.value.id === item.id) {
        return 'icon-play'
      }
      return ''
    }
    //选中歌曲
    const selectItem = function (item: any, index: number) {
      //如果随机 要找到索引
      if (mode.value === playMode.random) {
        index = playList.value.findIndex((song: song) => {
          return song.id === item.id
        })
      }
      store.commit('music/SET_CURRENTINDEX', index)
      store.commit('music/SET_PLAYING_STATE', true)
    }

    //删除一首
    const deleteOne = function (item: song) {
      store.dispatch('music/deleteSong', item)
      if (!playList.value.length) {
        hide()
      }
    }
    //删除全部
    const clearAll = function () {
      // this.$dialog.alert({
      //   title: '请确认',
      //   message: '是否删除全部歌曲',
      //   showCancelButton: true,
      //   closeOnPopstate: true
      // }).then(()=>{
      //   this.deleteSongList()
      // }).catch(()=>{
      //   return
      // })
    }
    //切换模式
    const changeMode = function () {
      const modeValue = (mode.value + 1) % 3
      store.commit('music/SET_PLAY_MODE', modeValue)
      let list = null
      if (modeValue === playMode.random) {
        list = xipai(sequenceList.value)
      } else {
        list = sequenceList.value
      }

      //    希望切换切换播放模式时，currentSong并不会改变 所以要找到它的位置
      let index = list.findIndex((item: song) => {
        return item.id === currentSong.value.id
      })
      store.commit('music/SET_CURRENTINDEX', index)
      store.commit('music/SET_PLAYLIST', list)
    }

    watch(
      () => currentSong.value,
      (newSong, oldSong) => {
        if (!newSong.id || !oldSong.id) {
          hide()
          return
        }

        if (!showFlag.value || newSong.id == oldSong.id) {
          return
        }

        scrollToCurrent(newSong)
      }
    )
    return {
      iconMode,
      showFlag,
      listContent,
      listItem,
      sequenceList,
      show,
      hide,
      getCurrentItem,
      selectItem,
      deleteOne,
      clearAll,
      changeMode,
      getFavoriteIcon,
      toggleFavorite
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: @color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: @color-theme-d;
        }

        .text {
          flex: 1;
          font-size: @font-size-medium;
          color: @color-text-l;
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

    .list-content {
      max-height: 300px;
      overflow: hidden;
      margin-bottom: 30px;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter,
        &.list-leave-to {
          height: 0;
        }

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: @font-size-small;
          color: @color-theme-d;
        }

        .text {
          flex: 1;
          .no-wrap();
          font-size: @font-size-medium;
          color: @color-text-d;
        }

        .like {
          .extend-click();
          margin-right: 15px;
          font-size: @font-size-small;
          color: @color-theme;

          .icon-favorite {
            color: @color-sub-theme;
          }
        }

        .delete {
          .extend-click();
          font-size: @font-size-small;
          color: @color-theme;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: @color-background;
      font-size: @font-size-medium-x;
      color: @color-text-l;
    }
  }
}
</style>
