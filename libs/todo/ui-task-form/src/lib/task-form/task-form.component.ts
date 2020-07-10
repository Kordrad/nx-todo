import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'todo-workspace-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  @Input() header = '';
  @Output() done = new EventEmitter<string>();

  title = '';

  constructor() {}

  accept() {
    this.done.emit(this.title);
    this.clearInput()
  }

  clearInput() {
    this.title = '';
  }
}
