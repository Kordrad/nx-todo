import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskDataService } from '../services/task-data.service';
import { tasksActions } from './tasks.actions';
import { map } from 'rxjs/operators';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '@todo-workspace/todo/domain';

@Injectable()
export class TasksEffect {
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(tasksActions.Types.LoadTask),
    fetch({
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
    })
  );

  @Effect()
  createTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.CreateTask),
    pessimisticUpdate({
      run: (action: tasksActions.Create) => {
        const { task, parameters } = action.payload;
        return this.taskDataService
          .createTask(task)
          .pipe(map(() => new tasksActions.Load({ parameters })));
      },
      onError: (action: tasksActions.Create, error: HttpErrorResponse) => {
        return error;
      },
    })
  );

  @Effect()
  deleteTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.DeleteTask),
    pessimisticUpdate({
      run: (action: tasksActions.Delete) => {
        const { id, parameters } = action.payload;
        return this.taskDataService
          .deleteTask(id)
          .pipe(map(() => new tasksActions.Load({ parameters })));
      },
      onError: (action: tasksActions.Delete, error: HttpErrorResponse) => {
        return error;
      },
    })
  );

  @Effect({ dispatch: false })
  updateTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.UpdateTask),
    pessimisticUpdate({
      run: ({ payload }: tasksActions.Update) => {
        return this.taskDataService.updateTask(payload);
      },
      onError: (action: tasksActions.Update, error: HttpErrorResponse) => {
        return error;
      },
    })
  );

  constructor(
    private taskDataService: TaskDataService,
    private actions$: Actions
  ) {}
}
