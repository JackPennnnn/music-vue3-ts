import { playMode } from '@/common/js/config'
import { xipai } from '@/utils/utils'
import { Commit } from 'vuex'
import { MusicType } from '@/store/modules/types/musicType'

function findIndex(randomlist: Array<Record<string, any>>, song: any): number {
  return randomlist.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = function (
  { commit, state }: { commit: Commit; state: MusicType },
  { list, index }: { list: Array<any>; index: number }
) {
  //commit(里面，对应mutation的方法名)
  commit('SET_SEQUENCE_LIST', list)
  if (state.mode === playMode.random) {
    const randomlist = xipai(list)
    commit('SET_PLAYLIST', randomlist)
    //也就是要找到顺序列表的歌  对应 随机列表的哪种歌
    index = findIndex(randomlist, list[index])
  } else {
    commit('SET_PLAYLIST', list)
  }

  commit('SET_CURRENTINDEX', index)
  //把播放器给打开
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}

export const randomPlay = function (
  { commit }: { commit: Commit },
  { list }: { list: Array<any> }
) {
  commit('SET_PLAY_MODE', playMode.random)
  commit('SET_SEQUENCE_LIST', list)
  const randomlist = xipai(list)
  commit('SET_PLAYLIST', randomlist)
  commit('SET_CURRENTINDEX', 0)
  //把播放器给打开
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}
