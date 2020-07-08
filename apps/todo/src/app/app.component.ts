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
  prev$: Observable<Task[]>;
  next$: Observable<Task[]>;
  pagination$: Observable<Number>;

  // New Task
  title: string;

  constructor(private store: Store<TasksState>) {
    this.task$ = this.store.select(getAllTasks);
    this.prev$ = this.store.select(getAllTasks);
    this.next$ = this.store.select(getAllTasks);
    this.pagination$ = this.store.select(getPageNumber)
  }

  ngOnInit() {
    this.store.dispatch(new taskActions.Load({_page: "20"}));
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
}
