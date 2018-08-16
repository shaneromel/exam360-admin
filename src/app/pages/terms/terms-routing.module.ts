import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateTermsComponent } from './update-terms/update-terms.component';

const routes: Routes = [
  {
    path:"update-terms", component:UpdateTermsComponent
  },
  {
    path:"", redirectTo:"update-terms", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
