import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskDataService } from '../services/task-data.service';
import { tasksActions } from './tasks.actions';
import { concatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskState } from './tasks.reducer';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';

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

  @Effect({ dispatch: false })
  createTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.CreateTask),
    concatMap((action: tasksActions.Create) => {
      if (action.payload._start && action.payload._limit) {
        const { _start, _limit } = action.payload;
        this.store$.dispatch(new tasksActions.Load({ _start, _limit }));
      }
      return this.taskDataService.createTask(action.payload.task);
    })
  );

  @Effect({ dispatch: false })
  deleteTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.DeleteTask),
    concatMap((action: tasksActions.Delete) => {
      const { _start, _limit } = action['payload'];
      if (_start && _limit) {
        this.store$.dispatch(new tasksActions.Load({ _start, _limit }));
      }
      return this.taskDataService.deleteTask(action.payload.id);
    })
  );

  @Effect({ dispatch: false })
  updateTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.UpdateTask),
    concatMap((action: tasksActions.Update) => {
      return this.taskDataService.updateTask(action.task);
    })
  );

  constructor(
    private taskDataService: TaskDataService,
    private actions$: Actions,
    private store$: Store<TaskState>
  ) {}
}
