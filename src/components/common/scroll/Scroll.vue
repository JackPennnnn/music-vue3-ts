<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import BScroll from '@better-scroll/core'
import { BScrollInstance } from '@better-scroll/core'

export default defineComponent({
  props: {
    //数字代表滚动事件
    /*
     * 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
     * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
     * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。*/
    probeType: {
      type: Number,
      default: 1
    },
    //etterScroll 默认会阻止浏览器的原生 click 事件。
    // 当设置为 true，BetterScroll 会派发一个 click 事件，
    // 我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    //让Scroll 监听滚动事件
    listenScroll: {
      tyoe: Boolean,
      default: false
    },
    //是否上啦刷新
    pullUp: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  emits: ['scroll', 'scrollToEnd', 'beforeScroll'],
  setup(props, context) {
    const wrapper = ref<HTMLElement | null>(null)
    let scroll = ref<BScrollInstance>()
    // 初始化better-scroll
    const _initScroll = function () {
      console.log(wrapper.value)
      if (!wrapper.value) {
        return
      }
      scroll.value = new BScroll(wrapper.value, {
        probeType: props.probeType,
        click: props.click,
        pullUpLoad: props.pullUp
      })

      // 判断是否监听滚动
      if (props.listenScroll) {
        scroll.value.on('scroll', (position: Record<string, any>) => {
          context.emit('scroll', position)
        })
      }

      //  判断是否上拉刷新
      if (props.pullUp) {
        scroll.value.on('scrollEnd', () => {
          if (scroll.value!.y <= scroll.value!.maxScrollY + 50) {
            context.emit('scrollToEnd')
          }
        })
      }

      //判断一开始接触
      if (props.beforeScroll) {
        scroll.value.on('beforeScrollStart', () => {
          context.emit('beforeScroll')
        })
      }
    }

    onMounted(() => {
      setTimeout(() => {
        _initScroll()
      }, 20)
    })

    // 暴露方法
    const enable = function () {
      scroll.value && scroll.value.enable()
    }
    const disable = function () {
      scroll.value && scroll.value.disable()
    }
    const refresh = function () {
      scroll.value && scroll.value.refresh()
    }
    const scrollTo = function (x: number, y: number) {
      scroll.value && scroll.value.scrollTo(x, y)
    }
    const scrollElement = function (el: HTMLElement | string) {
      //scrollToElement(el, time, offsetX, offsetY, easing)
      /*
      * 参数：
          {DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
          {Number} time 滚动动画执行的时长（单位 ms）
          {Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
          {Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
          {Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
          * */
      scroll.value && scroll.value.scrollToElement(el, 1000, 0, 0)
    }

    watch(
      () => props.data,
      () => {
        setTimeout(() => {
          refresh()
        }, 20)
      }
    )

    return {
      wrapper,
      enable,
      disable,
      refresh,
      scrollTo,
      scrollElement
    }
  }
})
</script>

<style scoped></style>
