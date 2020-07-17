import { TestBed } from '@angular/core/testing';
import { API_URL, Task } from '@todo-workspace/todo/domain';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskDataService } from './task-data.service';
import { first } from 'rxjs/operators';

const optionsService = {
  _start: '1',
  _limit: '5',
};
const url = 'https://test/';
const apiUrl = `${url}todos/`;

describe('TaskDataService', () => {
  let service: TaskDataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskDataService,
        {
          provide: API_URL,
          useValue: url,
        },
      ],
    });
  });

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskDataService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<Task[]>', () => {
    const dummyTasks = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autemXXXD',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
      },
      {
        userId: 1,
        id: 5,
        title:
          'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false,
      },
    ];
    let arr = [];
    service.getAllTasks(optionsService).subscribe((tasks: Task[]) => {
      arr = [...tasks];
    });

    const req = httpMock.expectOne(
      apiUrl +
        `?_start=${optionsService._start}&_limit=${optionsService._limit}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(dummyTasks);
    expect(arr).toHaveLength(5);
    expect(arr).toEqual(dummyTasks);
  });

  it('should delete task', () => {
    const dummyTasks = [
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autemXXXD',
        completed: false,
      },
    ];
    service.deleteTask(1).pipe(first()).subscribe();
    const req = httpMock.expectOne(apiUrl + '1');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyTasks);
  });

  it('should create task', () => {
    const dummyTask = {
      userId: 1,
      id: 6,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    };

    service.createTask(dummyTask).pipe(first()).subscribe();
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyTask);
  });

  it('should update task', () => {
    const dummyTask = {
      userId: 1,
      id: 3,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    };

    service
      .updateTask({ ...dummyTask, completed: true })
      .pipe(first())
      .subscribe();
    const req = httpMock.expectOne(apiUrl + dummyTask.id);
    expect(req.request.method).toBe('PUT');
    req.flush([dummyTask]);
  });
});
