import {
  Task,
  TaskParameters,
  UpdatePayload,
} from '@todo-workspace/todo/domain';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';
import { API_URL } from '@todo-workspace/todo/domain';

@Injectable()
export class TaskDataService {
  readonly endpoints = {
    getAllTasks: urlFactory(this.apiUrl + 'todos/'),
    createTask: urlFactory(this.apiUrl + 'todos/'),
    deleteTask: urlFactory<'id'>(this.apiUrl + 'todos/:id', true),
    updateTask: urlFactory<'id'>(this.apiUrl + 'todos/:id', true),
  };

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getAllTasks(parameters: TaskParameters): Observable<Task[]> {
    const url = this.endpoints.getAllTasks.url();
    const params = new HttpParams({ fromObject: { ...parameters } });
    return this.http.get<Array<Task>>(url, { params });
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.endpoints.createTask.url(), task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(this.endpoints.deleteTask.url({ id }));
  }

  updateTask(task: UpdatePayload): Observable<any> {
    return this.http.put(this.endpoints.updateTask.url({ id: task.id }), task);
  }
}
