import { Action } from '@ngrx/store';

export const ADD_TASK = '[Task] Add task';
export const REMOVE_TASK = '[Task] Remove task';


export class addTask implements Action {
  readonly type = ADD_TASK;

  constructor(public payload: { title: string }) {
  }
}

export class removeTask {
  readonly type = REMOVE_TASK;
}

export type All = addTask | removeTask
