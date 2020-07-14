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
import { TaskDataService } from './services/task-data.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(TASKS_FEATURE_KEY, tasksReducer),
    EffectsModule.forFeature([TasksEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    HttpClientModule,
  ],
  providers: [TaskDataService, TasksFacade],
})
export class TodoDataAccessModule {}
