import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TodoItem } from './todo-item.model';
import { TodoItemActions, TodoItemActionTypes } from './todo-item.actions';

export interface State extends EntityState<TodoItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<TodoItem> = createEntityAdapter<TodoItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: TodoItemActions
): State {
  switch (action.type) {
    case TodoItemActionTypes.AddTodoItem: {
      return adapter.addOne(action.payload.todoItem, state);
    }

    case TodoItemActionTypes.UpsertTodoItem: {
      return adapter.upsertOne(action.payload.todoItem, state);
    }

    case TodoItemActionTypes.AddTodoItems: {
      return adapter.addMany(action.payload.todoItems, state);
    }

    case TodoItemActionTypes.UpsertTodoItems: {
      return adapter.upsertMany(action.payload.todoItems, state);
    }

    case TodoItemActionTypes.UpdateTodoItem: {
      return adapter.updateOne(action.payload.todoItem, state);
    }

    case TodoItemActionTypes.UpdateTodoItems: {
      return adapter.updateMany(action.payload.todoItems, state);
    }

    case TodoItemActionTypes.DeleteTodoItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TodoItemActionTypes.DeleteTodoItems: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TodoItemActionTypes.LoadTodoItems: {
      return adapter.addAll(action.payload.todoItems, state);
    }

    case TodoItemActionTypes.ClearTodoItems: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
