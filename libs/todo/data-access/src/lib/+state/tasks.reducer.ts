import { tasksActions } from './tasks.actions';
import { Task } from '@todo-workspace/todo/domain';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TaskState extends EntityState<Task> {
  tasksLoaded: boolean;
  page: number | undefined;
  taskLength: number;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  tasksLoaded: false,
  page: undefined,
  taskLength: 0,
});

export function tasksReducer(
  state: TaskState = initialState,
  action: tasksActions.TaskType
) {
  switch (action.type) {
    case tasksActions.Types.LoadTask: {
      return adapter.removeAll({ ...state, tasksLoaded: false });
    }

    case tasksActions.Types.LoadTaskSuccess: {
      return adapter.addMany(action.tasks, {
        ...state,
        tasksLoaded: true,
      });
    }

    case tasksActions.Types.UpdateTask: {
      return adapter.updateOne(
        {
          id: action.task.id,
          changes: action.task,
        },
        state
      );
    }

    case tasksActions.Types.DeleteTask: {
      return adapter.removeOne(action.payload.id, state);
    }
    default:
      return state;
  }
}

export const { selectAll, selectIds } = adapter.getSelectors();
