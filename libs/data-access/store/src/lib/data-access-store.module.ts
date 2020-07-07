import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [CommonModule,
    StoreModule.forRoot({}, {})
  ],
})
export class DataAccessStoreModule {}
