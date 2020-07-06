import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksService } from '@todo-workspace/data-access/services/tasks';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
