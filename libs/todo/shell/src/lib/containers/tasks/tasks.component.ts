import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-workspace-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
