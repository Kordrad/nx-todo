import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { TaskDataService } from '../services/task-data.service';
import { tasksActions } from './tasks.actions';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '@todo-workspace/todo/domain';
import { TASKS_FEATURE_KEY, TaskState } from './tasks.reducer';

@Injectable()
export class TasksEffect {
  @Effect()
  loadTasks$ = this.dp.fetch(tasksActions.Types.LoadTask, {
    run: (action: tasksActions.Load) => {
      const limit = Number(action.payload.parameters._limit) - 1;
      const { page, parameters } = action.payload;
      return this.taskDataService
        .getAllTasks(parameters)
        .pipe(
          map(
            (tasks: Task[]) => new tasksActions.Loaded({ tasks, limit, page })
          )
        );
    },
    onError: (action: tasksActions.Load, error: HttpErrorResponse) => {
      return error;
    },
  });

  @Effect()
  createTask$ = this.dp.pessimisticUpdate(tasksActions.Types.CreateTask, {
    run: (action: tasksActions.Create, state: TaskState) => {
      const { parameters } = state[TASKS_FEATURE_KEY];
      const { task } = action.payload;
      return this.taskDataService
        .createTask(task)
        .pipe(map(() => new tasksActions.Load({ parameters })));
    },
    onError: (action: tasksActions.Create, error: HttpErrorResponse) => {
      return error;
    },
  });

  @Effect()
  deleteTask$ = this.dp.pessimisticUpdate(tasksActions.Types.DeleteTask, {
    run: (action: tasksActions.Delete, state: TaskState) => {
      const { parameters } = state[TASKS_FEATURE_KEY];
      const { id } = action.payload;
      return this.taskDataService
        .deleteTask(id)
        .pipe(map(() => new tasksActions.Load({ parameters })));
    },
    onError: (action: tasksActions.Delete, error: HttpErrorResponse) => {
      return error;
    },
  });

  @Effect()
  updateTask$ = this.dp.pessimisticUpdate(tasksActions.Types.UpdateTask, {
    run: ({ payload }: tasksActions.Update, state: TaskState) => {
      const { parameters } = state[TASKS_FEATURE_KEY];
      return this.taskDataService
        .updateTask(payload)
        .pipe(map(() => new tasksActions.Load({ parameters })));
    },
    onError: (action: tasksActions.Update, error: HttpErrorResponse) => {
      return error;
    },
  });

  constructor(
    private taskDataService: TaskDataService,
    private dp: DataPersistence<TaskState>
  ) {}
}
