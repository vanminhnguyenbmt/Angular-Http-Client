import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.class';

@Injectable()

export class TodoService {

  public API = 'http://5b7bbce8f583510014298cdb.mockapi.io/api/todos';

  constructor(public http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API, todo);
  }

  handleError(err) {
    if (err.error instanceof Error) {
      console.log(`Client side error: ${err.error.message}`);
    } else {
      console.log(`Server side error: ${err.status} - ${err.error}`);
    }
  }
}
