import jasperRequest from '@/request'

export function getHotkey() {
  return jasperRequest.get<any>({
    url: '/search/hot'
  })
}
