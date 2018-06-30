import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../../+state/todo-item/todo-item.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss'],
  animations: [
    trigger('toggleState', [
      state('true' , style({  })),
      state('false', style({ height: 0, padding: 0 })),
      state('void', style({ height: 0, padding: 0 })),
      // transition
      transition('* => *', animate('300ms')),
    ])
  ],
})
export class TodoListItemComponent implements OnInit {
  showDescription = false;
  @Input() item: TodoItem;
  @Output() edit: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() close: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

}
