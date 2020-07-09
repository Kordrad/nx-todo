import { Action } from '@ngrx/store';
import { Task, TaskParameters } from '@todo-workspace/todo/domain';

export const CREATE = '[Task] Create';
export const UPDATE = '[Task] Update';
export const DELETE = '[Task] Delete';
export const LOAD = '[Task] Load'
export const LOADED = '[Task] Loaded'

export class Load implements  Action {
  readonly  type = LOAD;

  constructor(public params?: TaskParameters) {
  }
}

export class Loaded implements  Action {
  readonly  type = LOADED;

  constructor(public tasks: Task[]) {
  }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public payload: {[kay: string]: any}) {
  }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public task: Partial<Task>) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public payload: {[kay: string]: any}) {
  }
}

export type TasksActions = Create | Update | Delete | Load | Loaded;
