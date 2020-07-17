import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

const exampleProperties = {
  header: 'test',
};
const inputValue = 'test';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let de: DebugElement;
  let input;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
      ],
      declarations: [TaskFormComponent, TestComponentWrapper],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    de = fixture.debugElement.children[0];

    input = de.query(By.css('input')).nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('header', () => {
    it(`input of header should gets string ("${exampleProperties.header}")`, () => {
      expect(component.header).toBe(exampleProperties.header);
      expect(component.header).not.toBe('');
    });

    it('should render header if property is not empty', () => {
      expect(de.query(By.css('h1'))).toBeTruthy();
    });

    it(`should render text in h1`, () => {
      expect(de.query(By.css('h1')).nativeElement.innerHTML).toBe(
        exampleProperties.header
      );
    });

    it('should sets empty string by default', () => {
      const componentInstance: TaskFormComponent = TestBed.createComponent(TaskFormComponent)
        .componentInstance;
      expect(componentInstance.header).toBe('');
      expect(componentInstance.header.length).toBe(0);
    });

    it('should not render header if property is null', () => {
      const debugElement: DebugElement = TestBed.createComponent(TaskFormComponent).debugElement;
      expect(debugElement.query(By.css('h1'))).toBeNull();
    });
  });

  describe('input', () => {
    it('should clear input on click clear button', fakeAsync(() => {
      expect(input.value).toBe('');
      input.value = inputValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe(inputValue);
      tick();

      const buttonClose = de.query(By.css('button[type="reset"]'))
        .nativeElement;

      buttonClose.click();
      fixture.detectChanges();
      expect(input.value).toBe('');
    }));

    it('should clear input on click done button', fakeAsync(() => {
      expect(input.value).toBe('');
      input.value = inputValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe(inputValue);
      tick();

      const buttonDone = de.query(By.css('button[type="submit"]'))
        .nativeElement;

      buttonDone.click();
      fixture.detectChanges();
      expect(input.value).toBe('');
    }));

    it('should emmit form on click done', fakeAsync(() => {
      const doneSpy = spyOn(component.done, 'emit');
      input.value = inputValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe(inputValue);
      tick();

      const buttonDone = de.query(By.css('button[type="submit"]'))
        .nativeElement;
      buttonDone.click();
      expect(doneSpy).toHaveBeenCalled();
      expect(doneSpy).toHaveBeenCalledWith({ title: inputValue });
    }));

    it('should emmit form on submit', fakeAsync(() => {
      const doneSpy = spyOn(component.done, 'emit');
      input.value = inputValue;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(input.value).toBe(inputValue);
      tick();

      const form = de.query(By.css('form')).nativeElement;
      form.submit()
      fixture.detectChanges();
      tick();

      expect(doneSpy).toHaveBeenCalled();
      expect(doneSpy).toHaveBeenCalledWith({ title: inputValue });
    }));
  });
});

@Component({
  template: `
    <todo-workspace-task-form
      [header]="header"
    ></todo-workspace-task-form>
  `,
})
class TestComponentWrapper {
  header = exampleProperties.header;
}
