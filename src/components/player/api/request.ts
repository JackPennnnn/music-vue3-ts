import jasperRequest from '@/request'
import { songUrlType } from '@/components/player/api/type'

export function getSongLyric(id: number) {
  return jasperRequest.get<any>({
    url: '/lyric',
    params: {
      id
    }
  })
}

export function getSongUrl(id: number) {
  return jasperRequest.get<songUrlType>({
    url: '/song/url',
    params: {
      id
    }
  })
}
