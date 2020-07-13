import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'todo-workspace-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit {
  @Input() header = '';
  @Output() done = new EventEmitter<string>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(form) {
    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.done.emit(form.value);
    this.taskForm.reset();

  }
}
