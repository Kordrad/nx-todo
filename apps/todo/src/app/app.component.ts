import { Component, OnInit } from '@angular/core';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TasksState, getAllTasks, taskActions } from '@todo-workspace/todo/data-access/store';


@Component({
  selector: 'todo-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  header = 'To do list';

  task$: Observable<Task[]>;
  taskStore$: Observable<any[]>;


  // New Task
  title: string;

  constructor(private store: Store<TasksState>) {
    this.task$ = this.store.select(getAllTasks);
    this.taskStore$ = this.store.select('tasks');
  }

  ngOnInit() {
    this.store.dispatch(new taskActions.Load());
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
      id: id,
      completed: completed,
    }));
  }

  deleteTask(id: number) {
    this.store.dispatch(new taskActions.Delete(`${id}`));
  }
}
