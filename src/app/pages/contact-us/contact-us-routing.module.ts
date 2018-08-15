import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OurLocationComponent } from './our-location/our-location.component';

const routes: Routes = [
  {
    path:"our-location",
    component:OurLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
