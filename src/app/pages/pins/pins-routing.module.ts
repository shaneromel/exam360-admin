import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePinsComponent } from './manage-pins/manage-pins.component';

const routes: Routes = [
  {
    path:"manage-pins", component:ManagePinsComponent
  },
  {
    path:"", redirectTo:"manage-pins", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PinsRoutingModule { }
