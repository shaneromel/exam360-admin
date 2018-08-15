import { Component, OnInit } from '@angular/core';
import { FaqService } from '../../../services/faq.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent implements OnInit {

  category:string;
  question:string;
  answer:string;

  constructor(private faqService:FaqService, private toaster:ToastrService) { }

  ngOnInit() {
  }

  addFaq(){
    var data={
      question:this.question,
      answer:this.answer
    }

    this.faqService.addCategory(this.category).then(()=>{
      this.faqService.addFaq(data, this.category).then(()=>{
        this.toaster.success("FAQ successfully added!")
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }).catch(err=>{
      this.toaster.error(err.message);
    })
    
  }

}
