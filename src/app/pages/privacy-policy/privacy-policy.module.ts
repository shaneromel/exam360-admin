import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { UpdatePrivacyPolicyComponent } from './update-privacy-policy/update-privacy-policy.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    SharedModule
  ],
  declarations: [UpdatePrivacyPolicyComponent]
})
export class PrivacyPolicyModule { }
