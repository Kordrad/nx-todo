import { TestBed } from '@angular/core/testing';
import { API_URL, Task } from '@todo-workspace/todo/domain';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskDataService } from './task-data.service';

const mockTasks = [
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
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
];
const optionsService = {
  _start: '1',
  _limit: '5',
};
const url = 'https://test/';
describe('TaskDataService', () => {
  let myProvider: TaskDataService;
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
    myProvider = TestBed.inject(TaskDataService);
  });

  it('should return an Observable<Task[]>', () => {
    myProvider.getAllTasks(optionsService).subscribe((tasks: Task[]) => {
      expect(tasks.length).toBe(5);
    });

    const request = httpMock.expectOne(
      url + `todos/?_start=${optionsService._start}&_limit=${optionsService._limit}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockTasks);

    httpMock.verify();
  });
});
