import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SellRoutingModule,
    SharedModule
  ],
  declarations: [UpdateComponent]
})
export class SellModule { }
