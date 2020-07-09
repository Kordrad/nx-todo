import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
// User imports
import { TasksEffect } from './+state/tasks.effect';
import { TASKS_FEATURE_KEY, tasksReducer } from './+state/tasks.reducer';
import { TasksFacade } from './+state/tasks.facade';
import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ [TASKS_FEATURE_KEY]: tasksReducer }),
    EffectsModule.forRoot([TasksEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientModule
  ],
  providers: [TaskService, TasksFacade]
})
export class TodoDataAccessModule {
}
