import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { DebugElement } from '@angular/core';

import {TodoUiTaskFormModule} from '@todo-workspace/todo/ui-task-form';
import { TodoUiTaskListModule } from '@todo-workspace/todo/ui-task-list';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { API_URL } from '@todo-workspace/todo/domain';


describe('TaskFormComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let de: DebugElement;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoUiTaskFormModule,
        TodoUiTaskListModule,
        TodoDataAccessModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        RouterTestingModule.withRoutes([])
      ],
      declarations: [TodoComponent],
      providers: [{ provide: API_URL, useValue: 'https://jsonplaceholder.typicode.com/todos/' }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
