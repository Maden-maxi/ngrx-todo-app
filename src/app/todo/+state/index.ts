import * as fromTodo from './todo/todo.reducer';
import * as fromTodoItem from './todo-item/todo-item.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
  layout: fromTodo.State;
  todoItems: fromTodoItem.State;
}

export const reducers: ActionReducerMap<State> = {
  todoItems: fromTodoItem.reducer,
  layout: fromTodo.reducer
};

export const getTodoState = createFeatureSelector<State>('todo');
export const getTodoItemState = createSelector(getTodoState, state => state.todoItems);
export const getLayoutState = createSelector(getTodoState, state => state.layout);
export const getTodoFormState = createSelector(getLayoutState, fromTodo.getForm);
export const getTodoFormModeState = createSelector(getLayoutState, fromTodo.getFormMode);
export const getTodoEntities = createSelector(getTodoItemState, fromTodoItem.selectAll);
export const getTodoProjects = createSelector(
  getTodoEntities,
    state => state.map(todo => todo.projectName).filter((value, index, self) => self.indexOf(value) === index )
);
