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

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.taskForm.invalid) {
      return;
    }
    this.done.emit(this.taskForm.value);
    this.taskForm.reset();
  }
}
