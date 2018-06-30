import { Action } from '@ngrx/store';
import { TodoItem } from '../todo-item/todo-item.model';

export enum TodoActionTypes {
  LoadTodos = '[Todo] Load Todos',
  PatchTodoForm = '[Todo] Patch Todo form',
  PatchTodoFormMode = '[Todo] Patch todo form mode'
}

export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LoadTodos;
}

export class PatchTodoForm implements Action {
  readonly type = TodoActionTypes.PatchTodoForm;
  constructor(public payload: TodoItem | null) { }
}

export class PatchTodoFormMode implements Action {
  readonly type = TodoActionTypes.PatchTodoFormMode;
  constructor(public payload: 'add' | 'edit' | 'none') { }
}

export type TodoActions = LoadTodos | PatchTodoForm | PatchTodoFormMode;
