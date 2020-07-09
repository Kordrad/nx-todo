import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-workspace-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() header = '';
  @Output() done = new EventEmitter<string>();

  _title = '';

  constructor() {
  }

  accept() {
    this.done.emit(this._title);
    this._title = '';
  }


}
