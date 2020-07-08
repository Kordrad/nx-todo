import { Component, OnInit } from '@angular/core';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllTasks, getPageNumber, taskActions, TasksState } from '@todo-workspace/todo/data-access/store';


@Component({
  selector: 'todo-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  header = 'To do list';

  task$: Observable<Task[]>;
  pagination$: Observable<Number>;
  page = 1;
  limit = 10;
  list: Task[];
  title: string;
  next = true;

  constructor(private store: Store<TasksState>) {
    this.task$ = this.store.select(getAllTasks);
    this.pagination$ = this.store.select(getPageNumber);
  }

  ngOnInit() {
    this.store.dispatch(new taskActions.Load({
      _start: `${this.limit * this.page - this.limit}`,
      _limit: `${this.limit + 1}`
    }));

    this.task$.subscribe((tasks) => {
      if (tasks.length > 0) {
        if (tasks.length === this.limit + 1) {
          this.next = true;
          tasks.pop();
        } else {
          this.next = false;
        }
        this.list = [...tasks];
      } else {
        this.next = false;
      }
    });
  }

  addTask() {
    if (this.title) {
      this.store.dispatch(new taskActions.Create({
        'title': this.title,
        'completed': false,
        'userId': 1,
        'id': new Date().valueOf()
      }));
      this.title = '';
    }
  }

  updateTask(id: number, completed: boolean) {
    this.store.dispatch(new taskActions.Update({
      id,
      completed
    }));
  }

  deleteTask(id: number) {
    this.store.dispatch(new taskActions.Delete(`${id}`));
  }

  changePage(value) {
    this.page += value;
    this.store.dispatch(new taskActions.Load({
      _start: `${this.limit * this.page - this.limit}`,
      _limit: `${this.limit + 1}`
    }));
  }
}
