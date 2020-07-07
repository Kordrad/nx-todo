import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../services/task.service';
import * as taskActions from './tasks.actions';
import { concatMap, map } from 'rxjs/operators';
import { Task } from '@todo-workspace/domain/interfaces/data';


@Injectable()
export class TasksEffect {
  @Effect()
  loadTasks$ = this.actions$.pipe(
    ofType(taskActions.LOAD),
    concatMap(() => {
      return this.taskService.getAllTasks()
    }),
    map(tasks => {
      return new taskActions.Loaded(tasks);
    })
  );

  @Effect({dispatch: false})
  createTask$ = this.actions$.pipe(
    ofType(taskActions.CREATE),
    concatMap((action) =>
      this.taskService.createTask(action)
    )
  );

  @Effect({dispatch: false})
  deleteTask$ = this.actions$.pipe(
    ofType(taskActions.DELETE),
    concatMap((id: string) => this.taskService.deleteTask(id))
  )

  @Effect({dispatch: false})
  updateTask$ = this.actions$.pipe(
    ofType(taskActions.UPDATE),
    concatMap((task: Task) => this.taskService.updateTask(task))
  )


  constructor(private taskService: TaskService, private actions$: Actions) {
  }
}
