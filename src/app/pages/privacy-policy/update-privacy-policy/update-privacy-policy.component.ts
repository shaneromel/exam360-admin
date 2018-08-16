import { Component, OnInit } from '@angular/core';
import { PrivacyPolicyService } from '../../../services/privacy-policy.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update-privacy-policy',
  templateUrl: './update-privacy-policy.component.html',
  styleUrls: ['./update-privacy-policy.component.scss']
})
export class UpdatePrivacyPolicyComponent implements OnInit {

  pp:string;

  constructor(private privacyPolicyService:PrivacyPolicyService, private toaster:ToastrService) { }

  ngOnInit() {
    this.privacyPolicyService.getPrivacyPolicy().subscribe(pp=>{
      this.pp=pp.pp;
    })
  }

  updatePrivacyPolicy(){
    this.privacyPolicyService.updatePrivacyPolicy(this.pp).then(()=>{
      this.toaster.success("Privacy Policy successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
