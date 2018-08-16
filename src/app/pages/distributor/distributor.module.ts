import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorRoutingModule } from './distributor-routing.module';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DistributorRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComponent]
})
export class DistributorModule { }
