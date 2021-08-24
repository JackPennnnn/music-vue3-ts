<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input
      ref="queryRef"
      class="box"
      placeholder="搜索歌曲、歌手"
      v-model="query"
    />
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { debounce } from '@/utils/utils'

export default defineComponent({
  emits: ['query'],
  setup(props, context) {
    const query = ref<string>('')
    const queryRef = ref()

    //清空搜索
    const clear = function () {
      query.value = ''
    }
    //设置搜索字
    const setQuery = function (value: string) {
      query.value = value
    }
    const blur = function () {
      queryRef.value.blur()
    }

    watch(
      () => query.value,
      debounce((newQuery: string) => {
        context.emit('query', newQuery)
      }, 200)
    )
    return {
      query,
      queryRef,
      clear,
      setQuery,
      blur
    }
  }
})
</script>

<style scoped lang="less">
@import '~@/common/style/variable.less';
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: @color-highlight-background;
  border-radius: 6px;

  .icon-search {
    font-size: 24px;
    color: @color-background;
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: @color-highlight-background;
    color: @color-text;
    font-size: @font-size-medium;
    outline: 0;
    &::placeholder {
      color: @color-text-d;
    }
  }

  .icon-dismiss {
    font-size: 16px;
    color: @color-background;
  }
}
</style>
