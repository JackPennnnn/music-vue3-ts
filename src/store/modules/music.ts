import { Module } from 'vuex'
import { MusicType } from '@/store/modules/types/musicType'

const musicModule: Module<MusicType, any> = {
  namespaced: true,
  state() {
    return {
      disc: {}
    }
  },
  mutations: {
    SET_DISC(state, disc: Record<string, any>) {
      state.disc = disc
    }
  },

  actions: {},
  getters: {
    disc(state) {
      return state.disc
    }
  }
}

export default musicModule
