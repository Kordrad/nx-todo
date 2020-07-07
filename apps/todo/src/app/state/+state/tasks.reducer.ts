import * as actions from './tasks.actions';
import { Task } from '@todo-workspace/domain/interfaces/data';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface TaskState extends EntityState<Task>{
  tasksLoaded: boolean
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  tasksLoaded: false,
})

export function tasksReducer(state: TaskState = initialState, action: actions.TasksActions) {
  switch (action.type) {
    case actions.LOADED: {
      return adapter.addMany(action.tasks, {
        ...state, tasksLoaded: true
      })
    }

    case actions.CREATE: {
      return adapter.addOne(action.task, state);
    }
    case actions.UPDATE: {
      return adapter.updateOne({
        id: action.payload.id,
        changes: action.payload
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
