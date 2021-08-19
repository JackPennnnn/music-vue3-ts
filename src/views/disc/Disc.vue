<template>
  <transition name="slide" :appear="true">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getDiscSong } from '@/views/disc/api/request'
import { createDisc } from '@/utils/song'
import { Song } from '@/utils/song'
import MusicList from '@/components/musicList/MusicList.vue'

export default defineComponent({
  components: {
    MusicList
  },
  setup() {
    const store = useStore()
    const $router = useRouter()
    const disc = store.getters['music/disc']

    const songs = ref<Array<InstanceType<typeof Song>>>()

    // computed
    const title = computed(() => disc.name)
    const bgImage = computed(() => disc.coverImgUrl)

    if (!disc.id) {
      $router.push('/recommend')
    }

    /**
     * 将歌单数组每一项都变成一个Song实例
     * @param list 歌单数组
     */
    const _normalizeSongs = function (
      list: Array<Record<string, any>>
    ): Array<InstanceType<typeof Song>> {
      let ret: any[] = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.al.id) {
          ret.push(createDisc(musicData))
        }
      })
      return ret
    }
    // 根据 id 请求歌单详情
    getDiscSong(disc.id).then((res) => {
      if (res.code === 200) {
        songs.value = _normalizeSongs(res.playlist.tracks)
      }
    })

    return {
      title,
      bgImage,
      songs
    }
  }
})
</script>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
