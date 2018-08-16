import { Component, OnInit } from '@angular/core';
import { TermsService } from '../../../services/terms.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update-terms',
  templateUrl: './update-terms.component.html',
  styleUrls: ['./update-terms.component.scss']
})
export class UpdateTermsComponent implements OnInit {

  terms:string;

  constructor(private termsService:TermsService, private toaster:ToastrService) { }

  ngOnInit() {
    this.termsService.getTerms().subscribe(terms=>{
      this.terms=terms.terms;
    })
  }

  updateTerms(){
    this.termsService.updateTerms(this.terms).then(()=>{
      this.toaster.success("Terms & Conditions successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
