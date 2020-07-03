import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TasksService } from './service/tasks.service';
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
