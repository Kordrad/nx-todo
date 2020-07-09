import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { areTasksLoaded, getAllTasks } from './tasks.selectors';
import { TaskState } from './tasks.reducer';
import * as taskActions from './tasks.actions';

@Injectable()
export class TasksFacade {
  tasks$ = this.store.select(getAllTasks);
  tasksLoaded$ = this.store.select(areTasksLoaded);

  private _page = 1;
  private _limit = 10;

  constructor(private store: Store<TaskState>) {
  }

  loadTasks({ limit = this._limit, page = this._page }) {
    this.store.dispatch(new taskActions.Load({
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`
    }));
    this._limit = limit;
    this._page = page;
  }

  addTask({ title, limit = this._limit, page = this._page }) {
    this.store.dispatch(new taskActions.Create({
      task: {
        'title': title,
        'completed': false,
        'userId': 1,
        'id': new Date().valueOf()
      },
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`
    }));
    this._limit = limit;
    this._page = page;
  }

  updateTask({ id, completed }) {
    this.store.dispatch(new taskActions.Update({
      id,
      completed
    }));
  }

  deleteTask({ id, limit = this._limit, page = this._page }) {
    this.store.dispatch(new taskActions.Delete({
      id: `${id}`,
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`
    }));
    this._limit = limit;
    this._page = page;
  }
}
