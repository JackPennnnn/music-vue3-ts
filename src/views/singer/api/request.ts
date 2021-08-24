import jasperRequest from '@/request'

export function getSinger() {
  return jasperRequest.get<any>({
    url: '/top/artists',
    params: {
      limit: 50
    }
  })
}

export function getSingerDetail(id: string | number) {
  return jasperRequest.get<any>({
    url: '/artists',
    params: {
      id
    }
  })
}
