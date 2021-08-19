import { MusicType } from '@/store/modules/types/musicType'

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
  }
}

export default mutations
