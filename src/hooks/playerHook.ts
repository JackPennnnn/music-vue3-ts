import { useStore } from 'vuex'
import { song } from '@/utils/song'

export function playerHook() {
  const store = useStore()
  const isFavorite = function (currentSong: song): boolean {
    const index = store.getters['music/favoriteList'].findIndex((item: any) => {
      return item.id === currentSong.id
    })
    return index > -1
  }
  const getFavoriteIcon = function (currentSong: song): string {
    if (isFavorite(currentSong)) {
      return 'icon-favorite'
    } else {
      return 'icon-not-favorite'
    }
  }

  const toggleFavorite = function (currentSong: song): void {
    if (isFavorite(currentSong)) {
      store.dispatch('music/deleteFavoriteList', currentSong)
    } else {
      store.dispatch('music/saveFavoriteList', currentSong)
    }
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
