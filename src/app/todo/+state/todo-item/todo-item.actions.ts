import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TodoItem } from './todo-item.model';

export enum TodoItemActionTypes {
  LoadTodoItems = '[TodoItem] Load TodoItems',
  AddTodoItem = '[TodoItem] Add TodoItem',
  UpsertTodoItem = '[TodoItem] Upsert TodoItem',
  AddTodoItems = '[TodoItem] Add TodoItems',
  UpsertTodoItems = '[TodoItem] Upsert TodoItems',
  UpdateTodoItem = '[TodoItem] Update TodoItem',
  UpdateTodoItems = '[TodoItem] Update TodoItems',
  DeleteTodoItem = '[TodoItem] Delete TodoItem',
  DeleteTodoItems = '[TodoItem] Delete TodoItems',
  ClearTodoItems = '[TodoItem] Clear TodoItems'
}

export class LoadTodoItems implements Action {
  readonly type = TodoItemActionTypes.LoadTodoItems;

  constructor(public payload: { todoItems: TodoItem[] }) {}
}

export class AddTodoItem implements Action {
  readonly type = TodoItemActionTypes.AddTodoItem;

  constructor(public payload: { todoItem: TodoItem }) {}
}

export class UpsertTodoItem implements Action {
  readonly type = TodoItemActionTypes.UpsertTodoItem;

  constructor(public payload: { todoItem: TodoItem }) {}
}

export class AddTodoItems implements Action {
  readonly type = TodoItemActionTypes.AddTodoItems;

  constructor(public payload: { todoItems: TodoItem[] }) {}
}

export class UpsertTodoItems implements Action {
  readonly type = TodoItemActionTypes.UpsertTodoItems;

  constructor(public payload: { todoItems: TodoItem[] }) {}
}

export class UpdateTodoItem implements Action {
  readonly type = TodoItemActionTypes.UpdateTodoItem;

  constructor(public payload: { todoItem: Update<TodoItem> }) {}
}

export class UpdateTodoItems implements Action {
  readonly type = TodoItemActionTypes.UpdateTodoItems;

  constructor(public payload: { todoItems: Update<TodoItem>[] }) {}
}

export class DeleteTodoItem implements Action {
  readonly type = TodoItemActionTypes.DeleteTodoItem;

  constructor(public payload: { id: string }) {}
}

export class DeleteTodoItems implements Action {
  readonly type = TodoItemActionTypes.DeleteTodoItems;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTodoItems implements Action {
  readonly type = TodoItemActionTypes.ClearTodoItems;
}

export type TodoItemActions =
 LoadTodoItems
 | AddTodoItem
 | UpsertTodoItem
 | AddTodoItems
 | UpsertTodoItems
 | UpdateTodoItem
 | UpdateTodoItems
 | DeleteTodoItem
 | DeleteTodoItems
 | ClearTodoItems;
