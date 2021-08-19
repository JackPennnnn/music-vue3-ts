import jasperRequest from '@/request'

import { dictListResultType } from '@/views/disc/api/type'

export function getDiscSong(id: string) {
  return jasperRequest.get<dictListResultType>({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
