import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@todo-workspace/todo/domain';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TasksFacade } from '@todo-workspace/todo/data-access';

@Component({
  selector: 'todo-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  page = 1;
  limit = 10;
  list: Task[];
  disableNextBtn = false;
  disablePrevBtn = false;


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
          tasks.pop();
        }
        this.list = [...tasks];
      }
    });
  }

  addTask(title: string) {
    this.tasksFacade.addTask({ title });
  }

  onChangePage(value: number) {
    this.page = value;
    this.tasksFacade.loadTasks({
      page: this.page,
      limit: this.limit
    });
    this.location.go('page/' + this.page);
  }

  onDelete(id) {
    this.tasksFacade.deleteTask({ id });
  }

  onChangeTask({ id, completed }) {
    this.tasksFacade.updateTask({ id, completed });
  }

}
