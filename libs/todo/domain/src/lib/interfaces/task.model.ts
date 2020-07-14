import { SortEnum } from '@todo-workspace/shared/domain';

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskParameters {
  page?: number;
  _order?: SortEnum.ascending | SortEnum.descending;
  _sort?: string;
  _limit?: string;
  _start?: string;
}
