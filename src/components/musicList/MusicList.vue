<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div
          ref="playBtn"
          v-show="songs.length > 0"
          class="play"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="Layer"></div>
    <scroll
      :data="songs"
      @scroll="scroll"
      class="list"
      ref="list"
      :probe-type="3"
      :listen-scroll="true"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <loading color="#1989fa" :size="50" v-show="!songs.length" />
    </scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Scroll from '@/components/common/scroll/Scroll.vue'
import { Loading } from 'vant'
import 'vant/es/loading/style'
import SongList from '@/components/songList/SongList.vue'

export default defineComponent({
  components: {
    Scroll,
    Loading,
    SongList
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, context) {
    const $router = useRouter()
    const store = useStore()
    const scrollY = ref<number>(0)
    const imageHeight = ref<number>(0)
    const maxTransLateY = ref<number>(0)

    const bgImg = ref()
    const list = ref()
    const Layer = ref()
    const playBtn = ref()

    const bgStyle = computed(() => `background-image:url(${props.bgImage})`)

    onMounted(() => {
      imageHeight.value = bgImg.value!.clientHeight
      //Layer的滑动距离 不能大于背景图片高度
      maxTransLateY.value = -imageHeight.value
      //scroll离顶部距离等于背景图的高
      list.value!.$el.style.top = `${imageHeight.value}px`
    })

    const scroll = function (position: { x: number; y: number }) {
      scrollY.value = position.y
    }

    // 点击返回键
    const back = function () {
      $router.back()
    }

    // 随机播放
    const random = function () {
      store.dispatch('music/randomPlay', { list: props.songs })
    }

    const selectItem = function (item: any, index: number) {
      store.dispatch('music/selectPlay', {
        list: props.songs,
        index: index
      })
    }

    watch(
      () => scrollY.value,
      (newY) => {
        let translateY = Math.max(maxTransLateY.value + 40, newY) //返回这组数据的最大值 maxTransLateY.value是负数
        let zIndex = 0
        let scale = 1
        if (newY > 0) {
          scale += Math.abs(newY / maxTransLateY.value)
          zIndex = 10
        }
        Layer.value.style.transform = `translate3d(0,${translateY}px,0)`
        Layer.value.style.webkitTransform = `translate3d(0,${translateY}px,0)`

        if (newY < maxTransLateY.value) {
          zIndex = 10
          bgImg.value.style.paddingTop = 0
          bgImg.value.style.height = '40px'
          playBtn.value.style.display = 'none'
        } else {
          bgImg.value.style.paddingTop = '70%'
          bgImg.value.style.height = 0
          playBtn.value.style.display = 'block'
        }
        bgImg.value.style.transform = `scale(${scale})`
        bgImg.value.style.webkitTransform = `scale(${scale})`
        bgImg.value.style.zIndex = zIndex
      }
    )

    return {
      bgStyle,
      scroll,
      back,
      selectItem,
      random,
      bgImg,
      list,
      Layer,
      playBtn
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
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

.title {
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 40;
  width: 80%;
  .no-wrap();
  text-align: center;
  line-height: 40px;
  font-size: @font-size-large;
  color: @color-text;
}

.bg-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;

  .play-wrapper {
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;

    .play {
      box-sizing: border-box;
      width: 135px;
      padding: 7px 0;
      margin: 0 auto;
      text-align: center;
      border: 1px solid @color-theme;
      color: @color-theme;
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
  }

  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.4);
  }
}

.bg-layer {
  position: relative;
  height: 100%;
  background: @color-background;
}

.list {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: @color-background;

  .song-list-wrapper {
    padding: 20px 30px;
  }
}

.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
