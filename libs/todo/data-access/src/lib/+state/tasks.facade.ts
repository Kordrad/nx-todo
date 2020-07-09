import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { areTasksLoaded, getAllTasks } from './tasks.selectors';
import { TaskState } from './tasks.reducer';
import * as taskActions from './tasks.actions';

@Injectable()
export class TasksFacade {
  tasks$ = this.store.select(getAllTasks);
  tasksLoaded$ = this.store.select(areTasksLoaded);

  constructor(private store: Store<TaskState>) {
  }

  loadTasks({ limit = 10, page = 1 }) {
    this.store.dispatch(new taskActions.Load({
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`,
      page: page
    }));
  }

  addTask({ title, limit = 10, page = 1 }) {
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
  }

  updateTask({ id, completed }) {
    this.store.dispatch(new taskActions.Update({
      id,
      completed
    }));
  }

  deleteTask({ id, limit, page }) {
    this.store.dispatch(new taskActions.Delete({
      id: `${id}`,
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`
    }));
  }

  getPage({ limit, page }) {
    this.store.dispatch(new taskActions.Load({
      _start: `${limit * page - limit}`,
      _limit: `${limit + 1}`
    }));
  }
}
