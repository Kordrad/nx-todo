import { selectAll, TaskState, TASKS_FEATURE_KEY } from './tasks.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const taskFeatureSelector = createFeatureSelector<TaskState>(
  TASKS_FEATURE_KEY
);

export const getAllTasks = createSelector(taskFeatureSelector, selectAll);

export const areTasksLoaded = createSelector(
  taskFeatureSelector,
  (state: TaskState) => state.tasksLoaded
);

export const getNextPageStatus = createSelector(
  taskFeatureSelector,
  (state: TaskState) => state.nextPage
);

export const getPrevPageStatus = createSelector(
  taskFeatureSelector,
  (state: TaskState) => state.prevPage
);
