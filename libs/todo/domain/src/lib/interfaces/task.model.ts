import { SortEnum } from '@todo-workspace/shared/domain';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskParameters {
  _end?: string
  _limit?: string;
  _order?: SortEnum.ascending | SortEnum.descending;
  _sort?: string;
  _start?: string;
}
