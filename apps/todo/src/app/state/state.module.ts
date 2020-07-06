import { NgModule }                  from '@angular/core';
import { StoreModule }               from '@ngrx/store';


// *************************
// Custom Application imports
// *************************

import { taskReducer }               from './+state/tasks.reducer';


@NgModule({
  imports: [
    // Signature matches AppState interface
    StoreModule.forRoot({
      tasks: taskReducer,
    })
  ]
})
export class StateModule { }
