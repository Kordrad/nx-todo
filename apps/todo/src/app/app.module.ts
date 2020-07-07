import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskModule } from './state/task.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, TaskModule, EffectsModule.forRoot([]), StoreDevtoolsModule.instrument({
    maxAge: 25
  })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
