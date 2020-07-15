import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { TodoUiTaskFormModule } from '@todo-workspace/todo/ui-task-form';
import { TodoUiTaskListModule } from '@todo-workspace/todo/ui-task-list';

@NgModule({
  imports: [CommonModule, TodoUiTaskFormModule, TodoUiTaskListModule],
  declarations: [TodoComponent],
  exports: [TodoComponent],
  entryComponents: [TodoComponent],
})
export class TodoFeatureModule {}
