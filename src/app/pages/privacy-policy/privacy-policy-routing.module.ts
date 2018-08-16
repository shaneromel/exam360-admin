import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePrivacyPolicyComponent } from './update-privacy-policy/update-privacy-policy.component';

const routes: Routes = [
  {
    path:"update-privacy-policy",
    component:UpdatePrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
