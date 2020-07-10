import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TasksFacade } from '@todo-workspace/todo/data-access';

@Component({
  selector: 'todo-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  page = 1;
  limit = 10;
  list: Task[];
  disableNextBtn = false;
  disablePrevBtn = false;
  spinner = false;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tasksFacade: TasksFacade,
    private _cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page'));

      if (this.page < 1) {
        this.page = 1;
        this.location.go('page/' + this.page);
      }
    });

    this.tasksFacade.loadTasks({
      limit: this.limit,
      page: this.page
    });

    this.tasksFacade.tasks$.subscribe((tasks) => {
      this.spinner = true;
      this.disablePrevBtn = true;
      if (tasks.length > 0) {
        this.disableNextBtn = true;
        if (tasks.length === this.limit + 1) {
          tasks.pop();
          this.disableNextBtn = false;
        }
        this.list = [...tasks];
        this.spinner = false;
      } else {
        this.disableNextBtn = true;
        this.disablePrevBtn = true;
      }
      this.disablePrevBtn = this.page <= 1;
      this._cdref.markForCheck()
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

  onChangeTask({ id, completed }: Partial<Task>) {
    this.tasksFacade.updateTask({ id, completed });
  }

}
