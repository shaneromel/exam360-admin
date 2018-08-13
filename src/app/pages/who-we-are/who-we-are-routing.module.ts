import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';

const routes: Routes = [
  {
    path:"about-us",
    component:AboutUsComponent
  },
  {
    path:"", redirectTo:"about-us", pathMatch:"full"
  },
  {
    path:"what-we-do", component:WhatWeDoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhoWeAreRoutingModule { }
