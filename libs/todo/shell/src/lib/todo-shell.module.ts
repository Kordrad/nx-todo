import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoShellRoutingModule } from './todo-shell-routing.module';
import { TasksComponent } from './containers/tasks/tasks.component';

@NgModule({
  imports: [
    CommonModule,
    TodoShellRoutingModule
  ],
  exports: [
    TodoShellRoutingModule
  ],
  declarations: [
    TasksComponent
  ]
})
export class TodoShellModule {
}
