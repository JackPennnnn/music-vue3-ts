<template>
  <div class="singer" ref="singer">
    <list-view
      :data="singers"
      @select="selectSinger"
      ref="listSinger"
    ></list-view>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getSinger } from '@/views/singer/api/request'
import { singerType, Singer } from '@/utils/singer'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ListView from '@/components/common/listView/ListView.vue'

export default defineComponent({
  components: {
    ListView
  },
  setup() {
    const store = useStore()
    const $router = useRouter()
    const singers = ref<Array<singerType>>([])

    const _normalizeSinger = function (list: Array<any>): Array<singerType> {
      const arr: Array<any> = []
      list.forEach((item: any) => {
        let obj = {
          id: item.id,
          name: item.name,
          avatar: item.picUrl
        }
        arr.push(new Singer(obj))
      })
      return arr
    }
    getSinger().then((res) => {
      if (res.code === 200) {
        singers.value = _normalizeSinger(res.artists)
      }
    })

    //跳转
    const selectSinger = function (item: singerType) {
      $router.push({
        path: `/singer/${item.id}`
      })
      store.commit('music/SET_SINGER', item)
    }
    return {
      singers,
      selectSinger
    }
  }
})
</script>

<style scoped lang="less">
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
