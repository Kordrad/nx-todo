import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '@todo-workspace/todo/domain';

@Component({
  selector: 'todo-workspace-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() header = '';
  @Input() list: Task[];
  @Input() disablePrevBtn = false;
  @Input() disableNextBtn = false;
  @Input() page = 1;
  @Input() disableSpinner = true;

  @Output() changePage = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<Partial<Task>>();


  onChangePage(number: number): void {
    this.changePage.emit(this.page + number);
  }

  onUpdateTask({ checked }: { checked: boolean }, id: number): void {
    this.toggleTask.emit({ id, completed: checked });
  }

  onDeleteTask(id: number): void {
    this.deleteTask.emit(id);
  }

  trackByFn(index: number, item: HTMLElement): string {
    return item.id;
  }
}
