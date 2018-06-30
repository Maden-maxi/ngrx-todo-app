import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatSnackBarModule, MatIconModule
} from '@angular/material';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from './+state/todo/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './+state/todo/todo.effects';
import { TodoActionsComponent } from './components/todo-actions/todo-actions.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from './+state';
import { ConnectFormDirective } from './directives/connect-form.directive';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TodoRoutingModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    OrderModule,
    StoreModule.forFeature('todo', reducers),
    EffectsModule.forFeature([TodoEffects])
  ],
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoActionsComponent,
    TodoListComponent,
    TodoListItemComponent,
    ConnectFormDirective
  ]
})
export class TodoModule { }
