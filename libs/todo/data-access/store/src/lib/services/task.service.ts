import { Task } from '@todo-workspace/todo/domian';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {
  url = 'https://jsonplaceholder.typicode.com/todos/';


  constructor(private http: HttpClient) {
  }

  getAllTasks({ params = {} }): Observable<Task[]> {
    let urlParams = new HttpParams();
    Object.keys(params).forEach((param) => {
      urlParams = urlParams.set(param, params[param]);
    });
    return this.http.get<Array<Task>>(this.url, { params: urlParams });
  }

  createTask({ payload: { task } }): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  deleteTask({ id }): Observable<any> {
    return this.http.delete(this.url + id);
  }

  updateTask({ task }): Observable<any> {
    return this.http.put(this.url + task.id, task);
  }
}
