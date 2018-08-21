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
  public todo: Todo = null;
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

  onAddTodo() {
    const todo = new Todo(this.title, this.completed);
    this.subscription = this.todoService.addTodo(todo).subscribe(data => {
      this.todos.push(data);
    }, error => {
      this.todoService.handleError(error);
    });
  }

  onEditTodo(item: Todo) {
    this.todo = item;
  }

  onUpdateTodo() {
    this.subscription = this.todoService.updateTodo(this.todo).subscribe(data => {
      const index = this.getIndex(data.id);
      this.todos[index] = data;
    }, error => {
      this.todoService.handleError(error);
    });
  }

  getIndex(id: number): number {
    let result = 0;
    this.todos.forEach((item, index) => {
      if (item.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDeleteTodo(id: number) {
    this.subscription = this.todoService.deleteTodo(id).subscribe(data => {
      const index = this.getIndex(data.id);
      this.todos.splice(index, 1);
    }, error => {
      this.todoService.handleError(error);
    });
  }
}
