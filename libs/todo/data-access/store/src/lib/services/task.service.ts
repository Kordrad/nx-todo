import { Task } from '@todo-workspace/domain/interfaces/data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TaskService {
  url = 'https://jsonplaceholder.typicode.com/todos/';


  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  deleteTask(taskID: string): Observable<any> {
    return this.http.delete(this.url + taskID);
  }

  updateTask(task: Partial<Task>): Observable<any> {
    return this.http.put(this.url + task.id, task);
  }
}
