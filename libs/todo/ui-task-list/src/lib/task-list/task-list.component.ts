import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';

@Component({
  selector: 'todo-workspace-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  @Input() header = '';
  @Input() list: Task[];
  @Input() disablePrevBtn = false;
  @Input() disableNextBtn = false;
  @Input() page = 1;
  @Input() activeSpinner = false;

  @Output() changePage = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<Partial<Task>>();

  limit = 10;

  constructor() {}

  ngOnInit(): void {}

  onChangePage(number: number) {
    this.changePage.emit(this.page + number);
  }

  onUpdateTask(id: number, completed?: boolean) {
    this.toggleTask.emit({ id, completed });
  }

  onDeleteTask(id: number) {
    this.deleteTask.emit(id);
  }
}
