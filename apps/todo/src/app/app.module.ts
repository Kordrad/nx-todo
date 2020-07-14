import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { TodoShellModule } from '@todo-workspace/todo/shell';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    TodoDataAccessModule,
    TodoShellModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
