import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
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
      run: (action) => {
        return this.taskService
          .getAllTasks(action)
          .pipe(map((data) => new tasksActions.Loaded(data)));
      },
      onError: (action: any, error: any) => {
        console.error(error);
        return null;
      },
    })
  );

  @Effect({ dispatch: false })
  createTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.CreateTask),
    concatMap((action) => {
      if (action['payload']['_start'] && action['payload']['_limit']) {
        const { _start, _limit } = action['payload'];
        this.store$.dispatch(new tasksActions.Load({ _start, _limit }));
      }
      return this.taskService.createTask(action);
    })
  );

  @Effect({ dispatch: false })
  deleteTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.DeleteTask),
    concatMap((action) => {
      const { _start, _limit } = action['payload'];
      if (_start && _limit) {
        this.store$.dispatch(new tasksActions.Load({ _start, _limit }));
      }
      return this.taskService.deleteTask(action);
    })
  );

  @Effect({ dispatch: false })
  updateTask$ = this.actions$.pipe(
    ofType(tasksActions.Types.UpdateTask),
    concatMap((action) => {
      return this.taskService.updateTask(action);
    })
  );

  constructor(
    private taskService: TaskService,
    private actions$: Actions,
    private store$: Store<TaskState>
  ) {}
}
