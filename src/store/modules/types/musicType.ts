export interface MusicType {
  //歌单
  disc: Record<string, any>
  mode: number
  sequenceList: Array<any>
  playList: Array<any>
  currentIndex: number
  fullScreen: boolean
  playing: boolean
  favoriteList: Array<any>
  playHistory: Array<any>
  searchHistory: Array<any>
  topList: Array<any>
}
