import { Component, OnInit } from '@angular/core';
import { TasksService } from '@todo-workspace/data-access/services/tasks';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { Store } from '@ngrx/store';
import * as TaskActions from './state/+state/tasks.actions';
import { Observable } from 'rxjs';
import { TasksState } from './state/state';

@Component({
  selector: 'todo-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';
  newTask: Task = {
    'userId': 1,
    'id': 101,
    'title': 'update task',
    'completed': true
  };

  tasksToDo: Task[] = [];
  tasksDone: Task[] = [];
  paginationToDo = 1;
  paginationDone = 1;
  task$: Observable<Task>;
  text: string;

  constructor(private tasksService: TasksService, private store: Store<TasksState>) {
    this.task$ = this.store.select('tasks');
  }

  pushTask() {
    this.store.dispatch(new TaskActions.addTask({
      title: this.text
    }));
    this.text = '';
  };

  ngOnInit() {
    // this.tasksService.getTasks({
    //   'completed': false,
    //   '_page': 1
    // }).subscribe((tasks: Task[]) => {
    //   this.tasksToDo = tasks;
    // });
    //
    // this.tasksService.getTasks({
    //   'completed': true,
    //   '_page': 1
    // }).subscribe((tasks: Task[]) => {
    //   this.tasksDone = tasks;
    // });
    // this.tasksService.createTasks(this.newTask).subscribe((task: Task) => {
    //   console.log(task);
    // });
    // this.tasksService.updateTask({ ...this.newTask, 'id': 1 }).subscribe((task: Task) => {
    //   console.log(task);
    // });
    // this.tasksService.deleteTask(1).subscribe((task: Task) => {
    //   console.log(task);
    // });
  }
}
