import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todo-workspace-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
