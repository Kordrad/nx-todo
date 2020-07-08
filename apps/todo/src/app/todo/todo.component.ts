import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { Store } from '@ngrx/store';
import { getAllTasks, taskActions, TaskState } from '@todo-workspace/todo/data-access/store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'todo-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  header = 'To do list';

  task$: Observable<Task[]>;
  page = 1;
  limit = 10;
  list: Task[];
  title: string;
  next = true;
  prev = true;

  constructor(private store: Store<TaskState>, private route: ActivatedRoute, private location: Location) {
    this.task$ = this.store.select(getAllTasks);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page'));
    });
    this.store.dispatch(new taskActions.Load({
      _start: `${this.limit * this.page - this.limit}`,
      _limit: `${this.limit + 1}`,
      page: this.page
    }));

    this.task$.subscribe((tasks) => {
      if (tasks.length > 0) {
        if (tasks.length === this.limit + 1) {
          this.next = true;
          tasks.pop();
        } else {
          this.next = false;
        }
        this.prev = this.page !== 1;
        this.list = [...tasks];
      } else {
        this.prev = false;
        this.next = false;
      }
    });
  }

  addTask() {
    if (this.title) {
      this.store.dispatch(new taskActions.Create({
        task: {
          'title': this.title,
          'completed': false,
          'userId': 1,
          'id': new Date().valueOf()
        },
        _start: `${this.limit * this.page - this.limit}`,
        _limit: `${this.limit + 1}`
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
    this.store.dispatch(new taskActions.Delete({
      id: `${id}`,
      _start: `${this.limit * this.page - this.limit}`,
      _limit: `${this.limit + 1}`
    }));
  }

  changePage(value) {
    this.page += value;
    this.store.dispatch(new taskActions.Load({
      _start: `${this.limit * this.page - this.limit}`,
      _limit: `${this.limit + 1}`
    }));
    this.location.go('page/' + this.page);
  }
}
