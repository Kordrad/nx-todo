import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
// User imports
import { TasksEffect } from './+state/tasks.effect';
import { TASKS_FEATURE_KEY, tasksReducer } from './+state/tasks.reducer';
import { TasksFacade } from './+state/tasks.facade';
import { TaskDataService } from './services/task-data.service';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(TASKS_FEATURE_KEY, tasksReducer),
    EffectsModule.forFeature([TasksEffect]),
    HttpClientModule,
  ],
  providers: [TaskDataService, TasksFacade, DataPersistence],
})
export class TodoDataAccessModule {}
