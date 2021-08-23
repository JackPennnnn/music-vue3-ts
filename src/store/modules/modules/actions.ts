import { playMode } from '@/common/js/config'
import { xipai } from '@/utils/utils'
import { Commit } from 'vuex'
import { MusicType } from '@/store/modules/types/musicType'
import { song } from '@/utils/song'
import {
  clearSearch,
  saveSearch,
  savePlay,
  deleteSearch,
  saveFavorite,
  deleteFavorite
} from '@/common/js/history'

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

export const insertSong = function (
  { commit, state }: { commit: Commit; state: MusicType },
  song: song
) {
  const playList = state.playList
  const sequenceList = state.sequenceList
  let currentIndex = state.currentIndex
  //记录当前歌曲
  const currentSong = playList[currentIndex]
  //判断当前列表是否已经有要插入的歌曲
  const fpIndex = findIndex(playList, song)
  //因为是插入歌曲，所以索引+1
  currentIndex++
  //插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song)
  //如果已经包含了这首歌
  if (fpIndex > -1) {
    //如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      //如果当前插入的序号小于于列表中的序号
      //+1  是前面已经插入了歌曲
      playList.splice(fpIndex + 1, 1)
    }
  }
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  const fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit('SET_PLAYLIST', playList)
  commit('SET_SEQUENCE_LIST', sequenceList)
  commit('SET_CURRENTINDEX', currentIndex)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}

export const deleteSong = function (
  { commit, state }: { commit: Commit; state: MusicType },
  song: song
) {
  const playList = state.playList
  const sequenceList = state.sequenceList
  let currentIndex = state.currentIndex

  const pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  const sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  //因为数组删除了一个 整体往前移
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit('SET_PLAYLIST', playList)
  commit('SET_SEQUENCE_LIST', sequenceList)
  commit('SET_CURRENTINDEX', currentIndex)
  //如果删完 则播放停止
  if (!playList.length) {
    commit('SET_PLAYING_STATE', false)
  } else {
    commit('SET_PLAYING_STATE', true)
  }
}

//删除播放列表全部歌曲
export const deleteSongList = function ({ commit }: { commit: Commit }) {
  commit('SET_PLAYLIST', [])
  commit('SET_SEQUENCE_LIST', [])
  commit('SET_CURRENTINDEX', -1)
  commit('SET_PLAYING_STATE', false)
}

export const saveSearchHistory = function (
  { commit }: { commit: Commit },
  query: any
) {
  commit('SET_SEARCH_HISTORY', saveSearch(query))
}

export const deleteSearchHistory = function (
  { commit }: { commit: Commit },
  query: any
) {
  commit('SET_SEARCH_HISTORY', deleteSearch(query))
}

export const clearSearchHistory = function (
  { commit }: { commit: Commit },
  query: any
) {
  commit('SET_SEARCH_HISTORY', clearSearch())
}

export const saveFavoriteList = function (
  { commit }: { commit: Commit },
  song: any
) {
  commit('SET_PLAY_FAVORITELIST', saveFavorite(song))
}

export const deleteFavoriteList = function (
  { commit }: { commit: Commit },
  song: any
) {
  commit('SET_PLAY_FAVORITELIST', deleteFavorite(song))
}

export const savePlayHistory = function (
  { commit }: { commit: Commit },
  song: any
) {
  commit('SET_PLAY_HISTORY', savePlay(song))
}
