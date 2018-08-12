import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhoWeAreRoutingModule } from './who-we-are-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    WhoWeAreRoutingModule
  ],
  declarations: [AboutUsComponent]
})
export class WhoWeAreModule { }
