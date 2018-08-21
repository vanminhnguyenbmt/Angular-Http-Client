import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Subscription } from 'rxjs';
import { Todo } from './models/todo.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public todos: Todo[] = [];
  public title: string;
  public completed = false;
  public subscription: Subscription;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription = this.todoService.getAllTodos().subscribe(data => {
      this.todos = data;
    }, error => {
      this.todoService.handleError(error);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAddToDo() {
    const todo = new Todo(this.title, this.completed);
    this.subscription = this.todoService.addTodo(todo).subscribe(data => {
      this.todos.push(data);
    }, error => {
      this.todoService.handleError(error);
    });
  }
}
