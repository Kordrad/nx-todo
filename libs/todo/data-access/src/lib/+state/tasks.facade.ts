import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  areTasksLoaded,
  getAllTasks,
  getNextPageStatus,
  getPrevPageStatus,
} from './tasks.selectors';
import { TaskState } from './tasks.reducer';
import { tasksActions } from './tasks.actions';

@Injectable()
export class TasksFacade {
  tasks$ = this.store.select(getAllTasks);
  tasksLoaded$ = this.store.select(areTasksLoaded);
  nextPageStatus$ = this.store.select(getNextPageStatus);
  prevPageStatus$ = this.store.select(getPrevPageStatus);

  constructor(private store: Store<TaskState>) {}

  loadTasks(page: number, limit: number = 10): void {
    const parameters = {
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`,
    };
    this.store.dispatch(new tasksActions.Load({ parameters, page }));
  }

  addTask(title: string): void {
    const task = {
      title: title,
      completed: false,
      userId: 1,
      id: new Date().valueOf(),
    };

    this.store.dispatch(new tasksActions.Create({ task }));
  }

  updateTask(id: number, completed: boolean): void {
    this.store.dispatch(new tasksActions.Update({ id, completed }));
  }

  deleteTask(id: number): void {
    this.store.dispatch(new tasksActions.Delete({ id }));
  }
}
