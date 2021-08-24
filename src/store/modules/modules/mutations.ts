import { MusicType } from '@/store/modules/types/musicType'
import { singerType } from '@/utils/singer'

const mutations = {
  SET_DISC(state: MusicType, disc: Record<string, any>) {
    state.disc = disc
  },
  SET_SEQUENCE_LIST(state: MusicType, list: Array<any>) {
    state.sequenceList = list
  },
  SET_PLAYLIST(state: MusicType, list: Array<any>) {
    state.playList = list
  },
  SET_CURRENTINDEX(state: MusicType, index: number) {
    state.currentIndex = index
  },
  SET_FULL_SCREEN(state: MusicType, flag: boolean) {
    state.fullScreen = flag
  },
  SET_PLAYING_STATE(state: MusicType, flag: boolean) {
    state.playing = flag
  },
  SET_PLAY_MODE(state: MusicType, mode: number) {
    state.mode = mode
  },
  SET_TOP_LIST(state: MusicType, topList: Array<any>) {
    state.topList = topList
  },
  SET_SEARCH_HISTORY(state: MusicType, searchHistory: Array<any>) {
    state.searchHistory = searchHistory
  },
  SET_PLAY_FAVORITELIST(state: MusicType, favoriteList: Array<any>) {
    state.favoriteList = favoriteList
  },
  SET_PLAY_HISTORY(state: MusicType, playHistory: Array<any>) {
    state.playHistory = playHistory
  },
  SET_SINGER(state: MusicType, singer: singerType) {
    state.singer = singer
  }
}

export default mutations
