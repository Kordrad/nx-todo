import { Action } from '@ngrx/store';
import { Task, TaskParameters } from '@todo-workspace/todo/domain';

export namespace tasksActions {
  export enum Types {
    CreateTask = '[Task] Create',
    UpdateTask = '[Task] Update',
    DeleteTask = '[Task] Delete',
    LoadTask = '[Task] Load',
    LoadTaskSuccess = '[Task] Loaded',
  }

  export class Load implements Action {
    readonly type = Types.LoadTask;

    constructor(public params?: TaskParameters) {}
  }

  export class Loaded implements Action {
    readonly type = Types.LoadTaskSuccess;

    constructor(
      public payload: { tasks: Task[]; limit: number; page: number }
    ) {}
  }

  export class Create implements Action {
    readonly type = Types.CreateTask;

    constructor(public payload: { [kay: string]: any }) {}
  }

  export class Update implements Action {
    readonly type = Types.UpdateTask;

    constructor(public task: Partial<Task>) {}
  }

  export class Delete implements Action {
    readonly type = Types.DeleteTask;

    constructor(public payload: { [kay: string]: any }) {}
  }

  export type TaskType = Create | Update | Delete | Load | Loaded;
}
