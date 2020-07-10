import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
  ],
  declarations: [TaskFormComponent],
  exports: [TaskFormComponent],
  entryComponents: [TaskFormComponent],
})
export class TodoUiTaskFormModule {}
