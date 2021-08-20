import { Module } from 'vuex'
import { MusicType } from '@/store/modules/types/musicType'
import { playMode } from '@/common/js/config'
import * as actions from './modules/actions'
import mutations from '@/store/modules/modules/mutations'
const musicModule: Module<MusicType, any> = {
  namespaced: true,
  state() {
    return {
      // 歌单
      disc: {},
      //  播放模式
      mode: playMode.sequence,
      //顺序歌曲列表,tips:当随机播放时  playList 跟 sequenceList不一样
      sequenceList: [],
      //歌曲列表
      playList: [],
      //当前播放歌曲位置
      currentIndex: -1,
      //是否全屏
      fullScreen: false,
      //是否播放
      playing: false
    }
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
  getters: {
    disc(state) {
      return state.disc
    },
    mode(state) {
      return state.mode
    },
    sequenceList(state) {
      return state.sequenceList
    },
    playList(state) {
      return state.playList
    },
    currentIndex(state) {
      return state.currentIndex
    },
    fullScreen(state) {
      return state.fullScreen
    },
    playing(state) {
      return state.playing
    },
    currentSong(state) {
      return state.playList[state.currentIndex] || {}
    }
  }
}

export default musicModule
