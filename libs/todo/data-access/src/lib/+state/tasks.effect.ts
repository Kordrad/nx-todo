import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import * as taskActions from './tasks.actions';
import { concatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TaskState } from './tasks.reducer';

@Injectable()
export class TasksEffect {
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(taskActions.LOAD),
    concatMap((params) => {
      return this.taskService.getAllTasks(params);
    }),
    map(tasks => {
      return new taskActions.Loaded(tasks);
    })
  );

  @Effect({ dispatch: false })
  createTask$ = this.actions$.pipe(
    ofType(taskActions.CREATE),
    concatMap((action) => {
      if (action['payload']['_start'] && action['payload']['_limit']) {
        const { _start, _limit } = action['payload'];
        this.store$.dispatch(new taskActions.Load({ _start, _limit }));
      }
        return this.taskService.createTask(action);
      }
    )
  );

  @Effect({ dispatch: false })
  deleteTask$ = this.actions$.pipe(
    ofType(taskActions.DELETE),
    concatMap((action) => {
      const { _start, _limit } = action['payload'];
      if (_start && _limit) {
        this.store$.dispatch(new taskActions.Load({ _start, _limit }));
      }
      return this.taskService.deleteTask(action);
    })
  );

  @Effect({ dispatch: false })
  updateTask$ = this.actions$.pipe(
    ofType(taskActions.UPDATE),
    concatMap((action) => {
      return this.taskService.updateTask(action);
    })
  );


  constructor(private taskService: TaskService, private actions$: Actions, private store$: Store<TaskState>) {
  }
}
