import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@todo-workspace/todo/domian';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TasksFacade } from '@todo-workspace/todo/data-access/store';

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

  constructor(private route: ActivatedRoute, private location: Location, private tasksFacade: TasksFacade) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page'));
    });

    this.tasksFacade.loadTasks({
      limit: this.limit,
      page: this.page
    });


    this.tasksFacade.tasks$.subscribe((tasks) => {
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
      this.tasksFacade.addTask({
        title: this.title,
        page: this.page,
        limit: this.limit
      });
      this.title = '';
    }
  }

  updateTask(id: number, completed: boolean) {
    this.tasksFacade.updateTask({
      id, completed
    });
  }

  deleteTask(id: number) {
    this.tasksFacade.deleteTask({ id, limit: this.limit, page: this.page });
  }

  changePage(value) {
    this.page += value;
    this.tasksFacade.getPage({
      page: this.page,
      limit: this.limit
    });
    this.location.go('page/' + this.page);
  }
}
