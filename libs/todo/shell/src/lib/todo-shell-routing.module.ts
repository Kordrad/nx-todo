import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './containers/tasks/tasks.component'

const routes: Routes = [
  { path: 'page/:page', component: TasksComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TodoShellRoutingModule {
}
