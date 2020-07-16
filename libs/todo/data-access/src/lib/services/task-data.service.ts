import { Task, TaskParameters } from '@todo-workspace/todo/domain';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';
import { API_URL } from '@todo-workspace/todo/domain';

@Injectable()
export class TaskDataService {
  readonly endpoints = {
    getAllTasks: urlFactory<'limit' | 'start'>(
      this.apiUrl + '?_start=:start&_limit=:limit',
      true
    ),
    createTask: urlFactory(this.apiUrl),
    deleteTask: urlFactory<'id'>(this.apiUrl + ':id', true),
    updateTask: urlFactory<'id'>(this.apiUrl + ':id', true),
  };

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  getAllTasks({ _start, _limit }: Partial<TaskParameters>): Observable<Task[]> {
    const url = this.endpoints.getAllTasks.url({
      limit: _limit,
      start: _start,
    });
    return this.http.get<Array<Task>>(url);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.endpoints.createTask.url(), task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.endpoints.deleteTask.url({ id }));
  }

  updateTask(task: Partial<Task>): Observable<any> {
    return this.http.put(this.endpoints.updateTask.url({ id: task.id }), task);
  }
}
