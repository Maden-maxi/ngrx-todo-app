import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TodoItem } from './+state/todo-item/todo-item.model';
import { select, Store } from '@ngrx/store';
import * as fromTodo from './+state';
import { AddTodoItem, AddTodoItems, DeleteTodoItem, UpdateTodoItem } from './+state/todo-item/todo-item.actions';
import { PatchTodoForm, PatchTodoFormMode } from './+state/todo/todo.actions';
import { LocalStorageService } from 'angular-2-local-storage';
import { map } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material';
import { UndoActions } from 'ngrx-undo-redo/src/undoRedo';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('anim', [
      transition('* => void', [
        style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
        sequence([
          animate('.25s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
          animate('.1s ease', style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none'  }))
        ])
      ]),
      transition('void => active', [
        style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
        sequence([
          animate('.1s ease', style({
            height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'
          })),
          animate('.35s ease', style({
            height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
          }))
        ])
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  sort = new FormControl(false);
  sortBy = 'id';
  projectNames$: Observable<any>;
  projectName = new FormControl('');
  todos$: Observable<TodoItem[]>;
  todoFrom$: Observable<TodoItem>;
  todoFormMode$: Observable<'add' | 'edit' | 'none'>;
  private _demoTodos: TodoItem[] = [
    {
      id: Date.now(),
      projectName: 'Shop',
      taskTitle: 'Cart module',
      priority: 1,
      description: 'lorem ipsum'
    },
    {
      id: Date.now() + 1,
      projectName: 'Shop',
      taskTitle: 'Search page',
      priority: 2,
      description: 'dolor lorem ipsum'
    },
    {
      id: Date.now() + 3,
      projectName: 'Shop',
      taskTitle: 'Product page',
      priority: 3,
      description: 'dolor lorem ipsum'
    },
    {
      id: Date.now() + 4,
      projectName: 'Shop',
      taskTitle: 'Home page',
      priority: 4,
      description: 'dolor lorem ipsum'
    }
  ];
  constructor(
    private _store: Store<fromTodo.State>,
    private _localStorageService: LocalStorageService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const lcTodos = this._localStorageService.get<TodoItem[]>('todos');
    if (lcTodos) {
      if (lcTodos.length) {
        this._store.dispatch(new AddTodoItems({todoItems: lcTodos}));
      }
    }
    this.todos$ = this._store.pipe(
      select(fromTodo.getTodoEntities),
      map(todos => {
        this._localStorageService.set('todos', todos);
        return todos;
      })
    );
    this.projectNames$ = this._store.pipe(
      select(fromTodo.getTodoProjects),
    );
    this.todoFrom$ = this._store.pipe(
      select(fromTodo.getTodoFormState)
    );
    this.todoFormMode$ = this._store.pipe(
      select(fromTodo.getTodoFormModeState)
    );
  }
  changeSort($event) {
    console.log($event);
    this.sortBy = $event.checked ? 'priority' : 'id';
  }
  onEdit($event: TodoItem) {
    this._store.dispatch(new PatchTodoForm($event));
    this._store.dispatch(new PatchTodoFormMode('edit'));
  }
  onClose($event: string) {
    this._store.dispatch(new DeleteTodoItem({id: $event}));
    const snackBar = this.snackBar.open('Completed', 'Undo', {
      duration: 5000
    });
    snackBar.onAction().subscribe(() => {
      this._store.dispatch(<UndoActions>{ type: 'UNDO_STATE' });
    });
  }
  turnAddMode() {
    this._store.dispatch(new PatchTodoFormMode('add'));
  }
  onSubmit($event: {item: TodoItem, mode: 'add' | 'edit'}) {
    if ($event.mode === 'add') {
      this._store.dispatch(new AddTodoItem({todoItem: $event.item}));
    } else {
      this._store.dispatch(new UpdateTodoItem({
        todoItem: {
          id: $event.item.id,
          changes: $event.item
        }
      }));
    }
    this._store.dispatch(new PatchTodoFormMode('none'));
  }
  onFormClose() {
    const todoItem: TodoItem = {
      id: 0,
      projectName: '',
      taskTitle: '',
      priority: 1,
      description: ''
    };
    this._store.dispatch(new PatchTodoForm(todoItem));
    this._store.dispatch(new PatchTodoFormMode('none'));
  }
  addDemoTodos() {
    this._store.dispatch(new AddTodoItems({todoItems: this._demoTodos}));
  }
}
