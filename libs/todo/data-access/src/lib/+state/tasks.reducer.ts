import { tasksActions } from './tasks.actions';
import { Task } from '@todo-workspace/todo/domain';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TaskState extends EntityState<Task> {
  tasksLoaded: boolean;
  limit: number;
  nextPage: boolean;
  prevPage: boolean;
  page: number;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
  tasksLoaded: false,
  limit: 0,
  nextPage: false,
  prevPage: false,
  page: 1,
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
      const { tasks, limit, page } = action.payload;
      let tasksList = [...tasks];
      let nextPage = false;
      let prevPage = false;
      const currentPage = page || state.page;

      if (tasksList.length === limit + 1) {
        tasksList.pop();
        nextPage = true;
      }
      if (currentPage > 1 ) {
        prevPage = true;
      }
      return adapter.addMany(tasksList, {
        ...state,
        limit,
        nextPage,
        prevPage,
        page: currentPage,
        tasksLoaded: true,
      });
    }

    case tasksActions.Types.UpdateTask: {
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
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
