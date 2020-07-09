import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { TodoShellModule } from '@todo-workspace/todo/shell';


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    TodoDataAccessModule,
    TodoShellModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
