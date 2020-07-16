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
import {
  AddTask,
  DeleteTask,
  LoadTasks,
  UpdateTask,
} from '@todo-workspace/todo/domain';

@Injectable()
export class TasksFacade {
  tasks$ = this.store.select(getAllTasks);
  tasksLoaded$ = this.store.select(areTasksLoaded);
  nextPageStatus$ = this.store.select(getNextPageStatus);
  prevPageStatus$ = this.store.select(getPrevPageStatus);

  constructor(private store: Store<TaskState>) {}

  loadTasks({ limit, page }: LoadTasks): void {
    this.store.dispatch(
      new tasksActions.Load({
        parameters: {
          _start: `${limit * page - limit}`,
          _limit: `${limit + 1}`,
        },
        page,
      })
    );
  }

  addTask({ title, limit, page }: AddTask): void {
    this.store.dispatch(
      new tasksActions.Create({
        task: {
          title: title,
          completed: false,
          userId: 1,
          id: new Date().valueOf(),
        },
        parameters: {
          _start: `${limit * page - limit}`,
          _limit: `${limit + 1}`,
        },
        page,
      })
    );
  }

  updateTask({ id, completed }: UpdateTask): void {
    this.store.dispatch(
      new tasksActions.Update({
        id,
        completed,
      })
    );
  }

  deleteTask({ id, limit, page }: DeleteTask): void {
    this.store.dispatch(
      new tasksActions.Delete({
        id: `${id}`,
        parameters: {
          _start: `${limit * page - limit}`,
          _limit: `${limit + 1}`,
        },
        page,
      })
    );
  }
}
