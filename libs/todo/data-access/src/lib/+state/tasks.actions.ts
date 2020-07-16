import { Action } from '@ngrx/store';
import {
  CreatePayload,
  DeletePayload,
  LoadedPayload,
  LoadPayload,
  UpdatePayload,
} from '@todo-workspace/todo/domain';

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

    constructor(public payload: LoadPayload) {}
  }

  export class Loaded implements Action {
    readonly type = Types.LoadTaskSuccess;

    constructor(public payload: LoadedPayload) {}
  }

  export class Create implements Action {
    readonly type = Types.CreateTask;

    constructor(public payload: CreatePayload) {}
  }

  export class Update implements Action {
    readonly type = Types.UpdateTask;

    constructor(public payload: UpdatePayload) {}
  }

  export class Delete implements Action {
    readonly type = Types.DeleteTask;

    constructor(public payload: DeletePayload) {}
  }

  export type TaskType = Create | Update | Delete | Load | Loaded;
}
