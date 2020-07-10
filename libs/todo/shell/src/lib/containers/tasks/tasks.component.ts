import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todo-workspace-tasks',
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  constructor() {}
}
