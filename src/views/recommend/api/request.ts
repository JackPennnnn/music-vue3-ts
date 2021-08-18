import jasperRequest from '@/request'
import {
  bannerResultType,
  playListResultType
} from '@/views/recommend/api/type'
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
type bannerType = 0 | 1 | 2 | 3

export function getBanner(type: bannerType = 0) {
  return jasperRequest.get<bannerResultType>({
    url: '/banner',
    params: {
      type
    }
  })
}

export function getPlayList(limit = 20, before?: number) {
  return jasperRequest.get<playListResultType>({
    url: '/top/playlist/highquality',
    params: {
      limit,
      before
    }
  })
}
