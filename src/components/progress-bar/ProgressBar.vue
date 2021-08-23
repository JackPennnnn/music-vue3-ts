<template>
  <slider v-model="percent1" active-color="#ffcd32" @change="change">
    <template v-slot:button>
      <div class="custom-button"></div>
    </template>
  </slider>
</template>

<script lang="ts">
import { Slider } from 'vant'
import 'vant/es/slider/style'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {
    Slider
  },
  emits: ['changeTime'],
  props: {
    percent: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    const percent1 = ref<number>(0)

    watch(
      () => props.percent,
      (newP) => {
        percent1.value = newP
      }
    )

    const change = function (value: number) {
      value /= 100
      context.emit('changeTime', value)
    }
    return {
      percent1,
      change
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';

.custom-button {
  width: 7px;
  height: 7px;
  border: 3px solid white;
  text-align: center;
  background-color: @color-theme;
  border-radius: 100px;
}
</style>
