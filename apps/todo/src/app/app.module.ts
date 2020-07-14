import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { TodoDataAccessModule } from '@todo-workspace/todo/data-access';
import { TodoShellModule } from '@todo-workspace/todo/shell';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { apiUrl } from '@todo-workspace/todo/domain';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    TodoDataAccessModule,
    TodoShellModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  bootstrap: [AppComponent],
  providers: [{provide: apiUrl, useValue: environment.apiURL}]
})
export class AppModule {}
