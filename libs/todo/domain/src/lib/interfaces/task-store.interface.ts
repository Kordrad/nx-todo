import { Task, TaskParameters } from '@todo-workspace/todo/domain';

export type UpdatePayload = Partial<Task>;

export interface LoadPayload {
  parameters: TaskParameters;
  page?: number;
}

export interface LoadedPayload {
  tasks: Task[];
  limit: number;
  page: number;
}

export interface CreatePayload {
  task: Task;
}

export interface DeletePayload {
  id: number;
}
