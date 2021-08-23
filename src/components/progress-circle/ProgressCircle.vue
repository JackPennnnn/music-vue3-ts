<template>
  <div>
    <Circle
      v-model="currentPercent"
      :rate="80"
      :speed="100"
      :size="30"
      color="#ffcd32"
      layer-color="blue"
    >
      <slot></slot>
    </Circle>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Circle } from 'vant'
import 'vant/es/circle/style'

export default defineComponent({
  components: {
    Circle
  },
  props: {
    currentRate: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const currentPercent = ref<number>(0)
    watch(
      () => currentPercent.value,
      (newRate) => {
        currentPercent.value = newRate
      }
    )
    return {
      currentPercent
    }
  }
})
</script>

<style scoped></style>
