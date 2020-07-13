import { Task } from '@todo-workspace/todo/domain';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';

@Injectable()
export class TaskDataService {
  apiUrl = 'https://jsonplaceholder.typicode.com/todos/';
  readonly endpoints = {
    getAllTasks: urlFactory(this.apiUrl + '?_page=:_page&_limit=:_limit', true),
    createTask: urlFactory(this.apiUrl + ':id'),
    deleteTask: urlFactory<'id'>(this.apiUrl + ':id', true),
    updateTask: urlFactory<'id'>(this.apiUrl + ':id', true),
  };

  constructor(private http: HttpClient) {}

  getAllTasks({ params = {} }): Observable<Task[]> {
    return this.http.get<Array<Task>>(this.endpoints.getAllTasks.url(params));
  }

  createTask({ payload: { task } }): Observable<Task> {
    return this.http.post<Task>(this.endpoints.createTask.url(), task);
  }

  deleteTask({ payload: { id } }): Observable<any> {
    return this.http.delete(this.endpoints.deleteTask.url({ id }));
  }

  updateTask({ task }): Observable<any> {
    return this.http.put(this.endpoints.updateTask.url({ id: task.id }), task);
  }
}
