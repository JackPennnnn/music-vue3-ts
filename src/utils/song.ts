export interface song {
  id: number
  mid: number
  singer: string
  name: string
  album?: number
  duration: number
  image?: string
  url?: string
}

export class Song {
  id: number
  mid: number
  singer: string
  name: string
  album?: number
  duration?: number
  image?: string
  url?: string

  constructor(config: song) {
    this.id = config.id
    this.mid = config.mid
    this.singer = config.singer
    this.name = config.name
    this.album = config.album
    this.duration = config.duration
    this.image = config.image
    this.url = config.url
  }
}

export function createDisc(musicData: Record<string, any>) {
  return new Song({
    id: musicData.id,
    mid: musicData.al.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl
  })
}

export function createSong(musicData: Record<string, any>) {
  return new Song({
    id: musicData.id,
    mid: musicData.al.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt / 1000,
    image: musicData.al.picUrl
  })
}

export function createSearchSong(musicData: Record<string, any>) {
  return new Song({
    id: musicData.id,
    mid: musicData.album.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.duration / 1000,
    image: musicData.album.artist.img1v1Url
  })
}

//万一出现有两个歌手['a','b']
/*
*  {name: "薛之谦", mid: "002J4UUk29y8BY", id: 5062}
{name: "刘惜君", mid: "003x77MM2iIg6c", id: 4674}*/
function filterSinger(singer: Array<Record<string, any>>): string {
  const ret: any[] = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })

  return ret.join('/')
}
