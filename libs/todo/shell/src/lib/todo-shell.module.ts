import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoShellRoutingModule } from './todo-shell-routing.module';
import { TasksComponent } from './containers/tasks/tasks.component';
import { TodoFeatureModule } from '@todo-workspace/todo/feature';

@NgModule({
  imports: [
    CommonModule,
    TodoShellRoutingModule,
    TodoFeatureModule
  ],
  exports: [
    TodoShellRoutingModule
  ],
  declarations: [
    TasksComponent,
  ]
})
export class TodoShellModule {
}
