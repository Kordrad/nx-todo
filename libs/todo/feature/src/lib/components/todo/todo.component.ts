import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';
import { ActivatedRoute, Router } from '@angular/router';
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
  private limit = 10;
  nextBtn$: Observable<boolean>;
  prevBtn$: Observable<boolean>;
  tasks$: Observable<Task[]>;
  tasksLoaded$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksFacade: TasksFacade,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksLoaded$ = this.tasksFacade.tasksLoaded$;
    this.nextBtn$ = this.tasksFacade.nextPageStatus$;
    this.prevBtn$ = this.tasksFacade.prevPageStatus$;

    this.setPage();
    this.loadTasks();
  }

  private setPage(): void {
    this.page = Number(this.route.snapshot.paramMap.get('page'));
    this.page = Math.max(1, this.page);
    this.goToPage(this.page);
  }

  private loadTasks(): void {
    this.tasksFacade.loadTasks({
      limit: this.limit,
      page: this.page,
    });
  }

  addTask(value: { title: string }): void {
    this.tasksFacade.addTask({
      title: value.title,
      page: this.page,
      limit: this.limit,
    });
  }

  onChangePage(value: number): void {
    this.page = value;
    this.tasksFacade.loadTasks({
      page: this.page,
      limit: this.limit,
    });
    this.goToPage(this.page);
  }

  private goToPage(page: number): void {
    this.router.navigate(['/page', page]);
  }

  onDelete(id: number): void {
    this.tasksFacade.deleteTask({ id, page: this.page, limit: this.limit });
  }

  onChangeTask({ id, completed }: Partial<Task>): void {
    this.tasksFacade.updateTask({ id, completed });
  }
}
