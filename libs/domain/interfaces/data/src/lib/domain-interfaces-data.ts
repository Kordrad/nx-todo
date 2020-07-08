export interface Task {
  userId?: number,
  id?: number,
  title?: string,
  completed?: boolean
}

export interface TaskParameters {
  page?: number,
  _order?: 'asc' | 'desc',
  _sort?: string,
  _limit?: string
  _start?: string,
}
