import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { OurLocationComponent } from './our-location/our-location.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    ThemeModule
  ],
  declarations: [OurLocationComponent]
})
export class ContactUsModule { }
