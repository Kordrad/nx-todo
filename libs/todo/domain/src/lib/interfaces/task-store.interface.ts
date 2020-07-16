import { Task, TaskParameters } from '@todo-workspace/todo/domain';

export type UpdatePayload = Partial<Task>;

export interface LoadPayload {
  parameters: TaskParameters,
  page?: number;
}

export interface LoadedPayload {
  tasks: Task[];
  limit: number;
  page: number;
}

export interface CreatePayload extends TaskParameters {
  task: Task;
  parameters: TaskParameters,
  page?: number;
}

export interface DeletePayload extends TaskParameters {
  id: string;
  parameters: TaskParameters,
  page?: number;
}

export interface LoadTasks {
  limit: number;
  page: number;
}

export interface AddTask {
  title: string;
  limit: number;
  page: number;
}

export interface UpdateTask {
  id: number;
  completed: boolean;
}

export interface DeleteTask {
  id: number;
  limit: number;
  page: number;
}
