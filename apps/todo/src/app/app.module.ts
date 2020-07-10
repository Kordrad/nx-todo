import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { TodoShellModule } from '@todo-workspace/todo/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, TodoDataAccessModule, TodoShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
