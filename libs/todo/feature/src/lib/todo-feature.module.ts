import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { TodoUiTaskFormModule } from '@todo-workspace/todo/ui-task-form';
import { TodoUiTaskListModule } from '@todo-workspace/todo/ui-task-list';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';

@NgModule({
  imports: [
    CommonModule,
    TodoDataAccessModule,
    TodoUiTaskFormModule,
    TodoUiTaskListModule,
  ],
  declarations: [TodoComponent],
  exports: [TodoComponent],
})
export class TodoFeatureModule {}
