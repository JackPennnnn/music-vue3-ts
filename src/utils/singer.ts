export interface singerType {
  id: number | string
  name: string
  avatar: string
}

export class Singer {
  id: number | string
  name: string
  avatar: string

  constructor({ id, name, avatar }: singerType) {
    this.id = id
    this.name = name
    this.avatar = avatar
  }
}
