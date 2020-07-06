import * as TaskActions from './tasks.actions';
import { TasksState } from '../state';
import { Task } from '@todo-workspace/domain/interfaces/data';

export type Action = TaskActions.All;

const defaultState: TasksState = {
  tasksOrderIds: [],
  tasks: {}
};

const addObject = (state, task: Task) => {
  const keys = Object.keys(state.tasks).reverse(); //.map(key => Number(key)).sort((a: number, b: number) => a - b).reverse();
  const id = keys[0] ? `${Number(keys[0]) + 1}` : '0';


  return Object.assign({}, state, {
    tasksOrderIds: [...state.tasksOrderIds, id],
    tasks: {
      ...state.tasks,
      [id]: {
        'userId': 1,
        'id': id,
        'title': task.title,
        'completed': false
      }
    }
  });
};

export function taskReducer(state: TasksState = defaultState, action: Action) {
  console.log({ action, type: action.type, state });

  switch (action.type) {
    case TaskActions.ADD_TASK: {
      return addObject(state, action.payload);
    }
    case TaskActions.REMOVE_TASK: {
      return '';
    }
    default: {
      return state;
    }
  }
}
