import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { TodoShellModule } from '@todo-workspace/todo/shell';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { API_URL } from '@todo-workspace/todo/domain';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    TodoShellModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: API_URL, useValue: environment.API_URL }],
})
export class AppModule {}
