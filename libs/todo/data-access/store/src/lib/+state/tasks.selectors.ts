import { selectAll, TaskState } from './tasks.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const taskFeatureSelector = createFeatureSelector<TaskState>('tasks');

export const getAllTasks = createSelector(
  taskFeatureSelector,
  selectAll
);

export const areTasksLoaded = createSelector(
  taskFeatureSelector,
  state => state.tasksLoaded
);
