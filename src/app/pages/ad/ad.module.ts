import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdRoutingModule } from './ad-routing.module';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComponent]
})
export class AdModule { }
