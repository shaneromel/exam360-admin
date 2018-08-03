import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsRoutingModule } from './pins-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ManagePinsComponent } from './manage-pins/manage-pins.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PinsRoutingModule,
    ThemeModule,
    SharedModule
  ],
  declarations: [ManagePinsComponent]
})
export class PinsModule { }
