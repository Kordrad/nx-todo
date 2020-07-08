import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import * as taskActions from './tasks.actions';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';
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
    withLatestFrom(this.store$),
    concatMap((actionAndState) => {
        const action = actionAndState[0];
        const pageNumber = actionAndState[1]['tasks'].page;
        if (pageNumber) {
          this.store$.dispatch(new taskActions.Load({ _page: pageNumber }));
        }
        return this.taskService.createTask(action);
      }
    )
  );

  @Effect({ dispatch: false })
  deleteTask$ = this.actions$.pipe(
    ofType(taskActions.DELETE),
    withLatestFrom(this.store$),
    concatMap((actionAndState) => {
      const action = actionAndState[0];
      const pageNumber = actionAndState[1]['tasks'].page;
      if (pageNumber) {
        this.store$.dispatch(new taskActions.Load({ _page: pageNumber }));
      }
      return this.taskService.deleteTask(action);
    })
  );

  @Effect({ dispatch: false })
  updateTask$ = this.actions$.pipe(
    ofType(taskActions.UPDATE),
    withLatestFrom(this.store$),
    concatMap((actionAndState) => {
      const action = actionAndState[0];
      const pageNumber = actionAndState[1]['tasks'].page;
      if (pageNumber) {
        this.store$.dispatch(new taskActions.Load({ _page: pageNumber }));
      }
      return this.taskService.updateTask(action);
    })
  );


  constructor(private taskService: TaskService, private actions$: Actions, private store$: Store<TaskState>) {
  }
}
