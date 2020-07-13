import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private tasksFacade: TasksFacade,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksLoaded$ = this.tasksFacade.tasksLoaded$;
    this.page = Number(this.route.snapshot.paramMap.get('page'));

    this.goToPage(this.page);
    this.loadTasks();
  }

  loadTasks() {
    this.tasksFacade.loadTasks({
      limit: this.limit,
      page: this.page,
    });
    this.cdref.markForCheck();
  }

  addTask({title}) {
    console.log(title)
    this.tasksFacade.addTask({ title, page: this.page, limit: this.limit });
  }

  onChangePage(value: number) {
    this.page = value;
    this.tasksFacade.loadTasks({
      page: this.page,
      limit: this.limit,
    });
    this.goToPage(this.page);
  }

  goToPage(number) {
    if (number < 1) {
      number = 1;
    }
    this.router.navigate(['/page', number], { relativeTo: this.route });
  }

  onDelete(id) {
    this.tasksFacade.deleteTask({ id, page: this.page, limit: this.limit });
  }

  onChangeTask({ id, completed }: Partial<Task>) {
    this.tasksFacade.updateTask({ id, completed });
  }
}
