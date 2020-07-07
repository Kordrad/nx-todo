import { Task } from '@todo-workspace/domain/interfaces/data';

export interface TasksState {
  tasksOrderIds?: string[];
  tasks: Task[]
}
