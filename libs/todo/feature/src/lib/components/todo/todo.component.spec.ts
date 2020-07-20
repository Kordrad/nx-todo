import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { TodoComponent } from './todo.component';
import { DebugElement } from '@angular/core';

import { TodoUiTaskFormModule } from '@todo-workspace/todo/ui-task-form';
import { TodoUiTaskListModule } from '@todo-workspace/todo/ui-task-list';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { API_URL } from '@todo-workspace/todo/domain';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
const api = 'https://test/';
// const apiUrl = api + 'todos/';

// const dummyTasks = [
//   {
//     userId: 1,
//     id: 1,
//     title: 'delectus aut autemXXXD',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 2,
//     title: 'quis ut nam facilis et officia qui',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 3,
//     title: 'fugiat veniam minus',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 4,
//     title: 'et porro tempora',
//     completed: true,
//   },
//   {
//     userId: 1,
//     id: 5,
//     title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
//     completed: false,
//   },
// ];

// const optionsService = {
//   _start: '1',
//   _limit: '5',
// };

const routes = [
  { path: '', redirectTo: 'page/1', pathMatch: 'full' },
  { path: 'page/:id', component: TodoComponent },
];

describe('TaskFormComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let de: DebugElement;
  let router: Router;
  let route: ActivatedRoute;
  let httpMock: HttpTestingController;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoUiTaskFormModule,
        TodoUiTaskListModule,
        TodoDataAccessModule,
        HttpClientTestingModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [TodoComponent],
      providers: [{ provide: API_URL, useValue: api }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /page/2', fakeAsync(() => {
    router.navigate(['page/2']);
    tick();
    expect(location.path()).toBe('/page/2');
  }));

  describe('should sets properties', () => {
    it.each([
      ['page', 1],
      ['limit', 10],
    ])(
      'should sets property %s with value %s by default',
      (property: string, value: number) => {
        expect(component[property]).toBe(value);
      }
    );

    it.each([['nextBtn$'], ['prevBtn$'], ['tasks$'], ['tasksLoaded$']])(
      'should init %s property',
      (property: string) => {
        expect(component[property]).toBeTruthy();
      }
    );

  });
});
