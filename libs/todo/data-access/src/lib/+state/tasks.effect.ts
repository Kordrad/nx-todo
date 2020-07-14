import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskDataService } from '../services/task-data.service';
import { tasksActions } from './tasks.actions';
import { map } from 'rxjs/operators';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TasksEffect {
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(tasksActions.Types.LoadTask),
    fetch({
      run: (action: tasksActions.Load) => {
        return this.taskDataService
          .getAllTasks(action.params)
          .pipe(map((data) => new tasksActions.Loaded(data)));
      },
      onError: (action: any, error: any) => {
        return error;
      },
    })
  );

  @Effect()
  createTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.CreateTask),
    pessimisticUpdate({
      run: (action: tasksActions.Create) => {
        const { task, _limit, _start } = action.payload;
        return this.taskDataService.createTask(task).pipe(
          map((data) => {
            return new tasksActions.Load({ _limit, _start });
          })
        );
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
        const { id, _limit, _start } = action.payload;
        return this.taskDataService.deleteTask(id).pipe(
          map((data) => {
            return new tasksActions.Load({ _limit, _start });
          })
        );
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
      run: ({ task }: tasksActions.Update) => {
        return this.taskDataService.updateTask(task)
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
