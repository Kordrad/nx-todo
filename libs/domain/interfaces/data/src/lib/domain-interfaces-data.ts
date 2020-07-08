export interface Task {
  userId?: number,
  id?: number,
  title?: string,
  completed?: boolean
}

export interface TaskParameters {
  _page?: string,
  _order?: 'asc' | 'desc',
  _sort?: string,
  _limit?: string
}
