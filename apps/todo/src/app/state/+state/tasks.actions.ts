import { Action } from '@ngrx/store';
import { Task } from '@todo-workspace/domain/interfaces/data';

export const CREATE = '[Task] Create';
export const UPDATE = '[Task] Update';
export const DELETE = '[Task] Delete';
export const LOAD = '[Task] Load'
export const LOADED = '[Task] Loaded'

export class Load implements  Action {
  readonly  type = LOAD;
}

export class Loaded implements  Action {
  readonly  type = LOADED;

  constructor(public tasks: Task[]) {
  }
}

export class Create implements Action {
  readonly type = CREATE;

  constructor(public task: Task) {
  }
}

export class Update implements Action {
  readonly type = UPDATE;

  constructor(public payload: Task) {
  }
}

export class Delete implements Action {
  readonly type = DELETE;

  constructor(public id: string) {
  }
}

export type TasksActions = Create | Update | Delete | Load | Loaded;
