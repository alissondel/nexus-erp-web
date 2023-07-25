export interface QueryState {
  states: {
    items: {
      id: number
      name: string
      uf: string
      active: boolean
    }[]
    pagination: {
      count: number
      currentPage: number
      pagesCount: number
      perPage: number
    }
  }
}

export interface StateData {
  id: number
  name: string
  uf: string
  active: boolean
}
