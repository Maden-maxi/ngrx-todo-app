import { Action } from '@ngrx/store';
import { TodoActions, TodoActionTypes } from './todo.actions';
import { TodoItem } from '../todo-item/todo-item.model';

export interface State {
  todoFormMode: 'add' | 'edit' | 'none';
  todoForm: TodoItem;
}

export const initialState: State = {
  todoForm: null,
  todoFormMode: 'none'
};

export function reducer(state = initialState, action: TodoActions): State {
  switch (action.type) {

    case TodoActionTypes.LoadTodos:
      return state;
    case TodoActionTypes.PatchTodoForm:
      return {
        ...state,
        todoForm: action.payload
      };
    case TodoActionTypes.PatchTodoFormMode:
      return {
        ...state,
        todoFormMode: action.payload
      };
    default:
      return state;
  }
}

export const getForm = (state: State) => state.todoForm;
export const getFormMode = (state: State) => state.todoFormMode;
