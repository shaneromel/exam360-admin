import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './banner/banner.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { FooterBannerComponent } from './footer-banner/footer-banner.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [BannerComponent, FooterBannerComponent]
})
export class HomeModule { }
