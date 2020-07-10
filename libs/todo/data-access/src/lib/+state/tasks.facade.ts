import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { areTasksLoaded, getAllTasks } from './tasks.selectors';
import { TaskState } from './tasks.reducer';
import { tasksActions } from './tasks.actions';

@Injectable()
export class TasksFacade {
  tasks$ = this.store.select(getAllTasks);
  tasksLoaded$ = this.store.select(areTasksLoaded);

  constructor(private store: Store<TaskState>) {}

  loadTasks({ limit, page }) {
    this.store.dispatch(
      new tasksActions.Load({
        _start: `${limit * page - limit}`,
        _limit: `${limit + 1}`,
      })
    );
  }

  addTask({ title, limit, page }) {
    this.store.dispatch(
      new tasksActions.Create({
        task: {
          title: title,
          completed: false,
          userId: 1,
          id: new Date().valueOf(),
        },
        _start: `${limit * page - limit}`,
        _limit: `${limit + 1}`,
      })
    );
  }

  updateTask({ id, completed }) {
    this.store.dispatch(
      new tasksActions.Update({
        id,
        completed,
      })
    );
  }

  deleteTask({ id, limit, page }) {
    this.store.dispatch(
      new tasksActions.Delete({
        id: `${id}`,
        _start: `${limit * page - limit}`,
        _limit: `${limit + 1}`,
      })
    );
  }
}
