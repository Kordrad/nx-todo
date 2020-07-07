import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TodoDataAccessStoreModule } from '@todo-workspace/todo/data-access/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, TodoDataAccessStoreModule, EffectsModule.forRoot([]), StoreDevtoolsModule.instrument({
    maxAge: 25
  })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
