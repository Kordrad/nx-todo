import { Component, OnInit } from '@angular/core';
import { TasksService } from '@todo-workspace/data-access/services/tasks';
import { Task } from '@todo-workspace/domain/interfaces/data';

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

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getTasks({
      'completed': false,
      '_page': 1
    }).subscribe((tasks: Task[]) => {
      this.tasksToDo = tasks;
    });

    this.tasksService.getTasks({
      'completed': true,
      '_page': 1
    }).subscribe((tasks: Task[]) => {
      this.tasksDone = tasks;
    });
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
