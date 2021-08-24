import jasperRequest from '@/request'

export function getSearchResult(keywords: string, offset?: number) {
  return jasperRequest.get<any>({
    url: '/search',
    params: {
      keywords,
      offset
    }
  })
}
