<template>
  <transition name="slide" :appear="true">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import MusicList from '@/components/musicList/MusicList.vue'
import { getSingerDetail } from '@/views/singer/api/request'
import { createSong } from '@/utils/song'

export default defineComponent({
  components: {
    MusicList
  },
  setup() {
    const store = useStore()
    const songs = ref<Array<any>>([])
    const $router = useRouter()
    const title = computed(() => store.getters['music/singer'].name)
    const bgImage = computed(() => store.getters['music/singer'].avatar)

    if (!store.getters['music/singer'].id) {
      $router.push('/singer')
    }
    const _normalizeSongs = function (list: any) {
      let ret: Array<any> = []
      list.forEach((item: any) => {
        ret.push(createSong(item))
      })
      return ret
    }
    getSingerDetail(store.getters['music/singer'].id).then((res) => {
      if (res.code === 200) {
        songs.value = _normalizeSongs(res.hotSongs)
      }
    })
    return {
      songs,
      title,
      bgImage
    }
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
