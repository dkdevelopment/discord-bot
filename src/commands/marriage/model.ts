export interface Marriage {
  user: {
    id: string
  }
  secondUser: {
    id: string
  }
  created: Date
  status: 'active' | 'divorced'
}