import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TasksFacade } from '@todo-workspace/todo/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'todo-workspace-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  page = 1;
  limit = 10;
  disableNextBtn = false;
  disablePrevBtn = false;
  tasks$: Observable<Task[]>;
  tasksLoaded$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tasksFacade: TasksFacade,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksLoaded$ = this.tasksFacade.tasksLoaded$;

    this.route.paramMap.subscribe((params) => {
      this.page = Number(params.get('page'));

      if (this.page < 1) {
        this.page = 1;
        this.location.go('page/' + this.page);
      }
    });

    this.loadTasks();
  }

  loadTasks() {
    this.tasksFacade.loadTasks({
      limit: this.limit,
      page: this.page,
    });
    this.cdref.markForCheck();
  }

  addTask(title: string) {
    this.tasksFacade.addTask({ title, page: this.page, limit: this.limit });
  }

  onChangePage(value: number) {
    this.page = value;
    this.tasksFacade.loadTasks({
      page: this.page,
      limit: this.limit,
    });
    this.location.go('page/' + this.page);
  }

  onDelete(id) {
    this.tasksFacade.deleteTask({ id, page: this.page, limit: this.limit });
  }

  onChangeTask({ id, completed }: Partial<Task>) {
    this.tasksFacade.updateTask({ id, completed });
  }
}
