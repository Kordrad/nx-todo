import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const routes: Routes = [{ path: '', redirectTo: 'page/1', pathMatch: 'full' }];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
