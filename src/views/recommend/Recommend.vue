<template>
  <div class="recommend">
    <scroll
      class="recommend-content"
      :before-scroll="true"
      :data="recommendArr.goodPlayList"
      ref="scroll"
    >
      <div>
        <div class="slider-wrapper">
          <swipe :autoplay="3000" :stop-propagation="false">
            <swipe-item
              v-for="item in recommendArr.banners"
              :key="item.bannerId"
            >
              <img :src="item.pic" />
            </swipe-item>
          </swipe>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="item in recommendArr.goodPlayList"
              class="item"
              :key="item.id"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img
                  :src="item.coverImgUrl"
                  @load="loadImage"
                  width="60"
                  height="60"
                />
              </div>
              <div class="text">
                <h2 class="name">{{ item.creator.nickname }}</h2>
                <p class="desc">{{ item.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getBanner, getPlayList } from '@/views/recommend/api/request'
import Scroll from '@/components/common/scroll/Scroll.vue'
import { Swipe, SwipeItem } from 'vant'
import 'vant/es/swipe/style'

export default defineComponent({
  components: {
    Swipe,
    SwipeItem,
    Scroll
  },
  setup() {
    const scroll = ref()
    const $router = useRouter()
    const store = useStore()

    let recommendArr = reactive({
      banners: [] as Array<Record<string, any>>,
      goodPlayList: [] as Array<Record<string, any>>
    })
    // 请求轮播图
    getBanner(1).then((res) => {
      if (res.code === 200) {
        recommendArr.banners = res.banners
      }
    })

    // 请求热门歌单信息
    getPlayList().then((res) => {
      if (res.code === 200) {
        recommendArr.goodPlayList = res.playlists
      }
    })

    // 图片加载
    const loadImage = function () {
      setTimeout(() => {
        scroll.value?.refresh()
      }, 200)
    }

    // 选中某一个歌单
    const selectItem = function (item: Record<string, any>) {
      $router.push(`/recommend/${item.id}`)
      store.commit('music/SET_DISC', item)
    }

    return {
      recommendArr,
      loadImage,
      selectItem
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
@import '~@/common/style/mixins.less';
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 161px;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: @font-size-medium;
        color: @color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: @font-size-medium;

          .name {
            margin-bottom: 10px;
            color: @color-text;
          }

          .desc {
            color: @color-text-d;
          }
        }
      }
    }

    .van-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>
