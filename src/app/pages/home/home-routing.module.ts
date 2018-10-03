import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FooterBannerComponent } from './footer-banner/footer-banner.component';

const routes: Routes = [
  {
    path:"banner", component:BannerComponent
  },
  {
    path:"footer-banner", component:FooterBannerComponent
  },
  {
    path:"", redirectTo:"banner", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
