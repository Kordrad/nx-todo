import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '@todo-workspace/domain/interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  url = 'https://jsonplaceholder.typicode.com/todos/';

  createTasks(task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  getTasks(params?: Object): Observable<Array<Task>> {
    let urlParams = new HttpParams();
    Object.keys(params).forEach((param) => {
      urlParams = urlParams.set(param, params[param]);
    });
    return this.http.get<Array<Task>>(this.url, { params: urlParams });
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}${id}`);
  }


  updateTask(task): Observable<Task> {
    return this.http.put<Task>(`${this.url}${task.id}`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}${id}`);
  }
}
