import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TaskService } from './services/task.service';
import { tasksReducer } from './+state/tasks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffect } from './+state/tasks.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    StoreModule.forRoot({
      tasks: tasksReducer
    }),
    EffectsModule.forFeature([TasksEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [TaskService]
})
export class TaskModule {
}
