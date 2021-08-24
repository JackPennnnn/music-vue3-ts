<template>
  <transition name="slide" appear>
    <div class="user-center">
      <div class="back">
        <i class="icon-back" @click="back"></i>
      </div>
      <div class="switches-wrapper">
        <switches
          :switches="switches"
          :current-index="currentIndex"
          @switch="switchItem"
        ></switches>
      </div>
      <div class="play-btn" ref="playBtn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll
          ref="favoriteList"
          class="list-scroll"
          :data="favoriteList"
          v-if="this.currentIndex === 0"
        >
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll
          ref="playHistory"
          class="list-scroll"
          :data="playHistory"
          v-else
        >
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { MusicType } from '@/store/modules/types/musicType'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Scroll from '@/components/common/scroll/Scroll.vue'
import Switches from '@/components/switches/Switches.vue'
import SongList from '@/components/songList/SongList.vue'
export default defineComponent({
  components: {
    Scroll,
    Switches,
    SongList
  },
  setup() {
    const currentIndex = ref<number>(0)
    const switches = ref([{ name: '我喜欢的' }, { name: '最近听的' }])
    const store = useStore()
    const $router = useRouter()

    const favoriteList = computed(() => {
      return store.getters['music/favoriteList']
    })

    const playHistory = computed(() => {
      return store.getters['music/playHistory']
    })
    //switch派发出来的
    const switchItem = function (index: number) {
      currentIndex.value = index
    }

    //song-list派发出来
    const selectSong = function (song: MusicType) {
      store.dispatch('music/insertSong', song)
    }

    //后退
    const back = function () {
      $router.back()
    }

    //随机播放
    const random = function () {
      let list =
        currentIndex.value === 0
          ? store.getters['music/favoriteList']
          : store.getters['music/playHistory']
      store.dispatch('music/randomPlay', {
        list: list
      })
    }
    return {
      switches,
      currentIndex,
      switchItem,
      selectSong,
      back,
      random,
      playHistory,
      favoriteList
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';

.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @color-background;

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: @font-size-large-x;
      color: @color-theme;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid @color-text-l;
    color: @color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: @font-size-medium-x;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: @font-size-small;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: 20px 30px;
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
