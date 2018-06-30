import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TodoActions, TodoActionTypes } from './todo.actions';

@Injectable()
export class TodoEffects {

  @Effect()
  effect$ = this.actions$.ofType(TodoActionTypes.LoadTodos);

  constructor(private actions$: Actions) {}
}
