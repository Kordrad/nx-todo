import * as actions from './tasks.actions';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface TaskState extends EntityState<Task> {
  tasksLoaded: boolean
  page: number | undefined,
  taskLength: number
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  tasksLoaded: false,
  page: undefined,
  taskLength: 0
});

export function tasksReducer(state: TaskState = initialState, action: actions.TasksActions) {
  switch (action.type) {
    case actions.LOAD: {
      return adapter.removeAll(state);
    }

    case actions.LOADED: {

      return adapter.addMany(action.tasks, {
        ...state, tasksLoaded: true
      });
    }

    case actions.UPDATE: {
      return adapter.updateOne({
        id: action.task.id,
        changes: action.task
      }, state);
    }

    case actions.DELETE: {
      return adapter.removeOne(action.id, state);
    }
    default:
      return state;
  }
}

export const { selectAll, selectIds } = adapter.getSelectors();
