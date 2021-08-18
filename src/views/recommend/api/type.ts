export interface bannerResultType {
  code: number
  banners: Array<Record<string, any>>
}

export interface playListResultType {
  code: number
  lasttime: number
  more: boolean
  playlists: Array<Record<string, any>>
  total: number
}
