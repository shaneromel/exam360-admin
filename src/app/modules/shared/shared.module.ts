import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports:[Ng2SmartTableModule]
})
export class SharedModule { }
