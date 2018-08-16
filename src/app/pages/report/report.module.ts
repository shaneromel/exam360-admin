import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComponent]
})
export class ReportModule { }
