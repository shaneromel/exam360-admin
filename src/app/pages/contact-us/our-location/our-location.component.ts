import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../../../services/contact-us.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-our-location',
  templateUrl: './our-location.component.html',
  styleUrls: ['./our-location.component.scss']
})
export class OurLocationComponent implements OnInit {

  line1:string;
  line2:string;
  line3:string;
  line4:string;
  phone1:string;
  phone2:string;
  openingTimes:string;

  constructor(private contactUsService:ContactUsService, private toaster:ToastrService) { }

  ngOnInit() {
    this.contactUsService.getContactUs().subscribe(contactUs=>{
      this.line1=contactUs.address.line1;
      this.line2=contactUs.address.line2;
      this.line3=contactUs.address.line3;
      this.line4=contactUs.address.line4;
      this.phone1=contactUs.phone.phone1;
      this.phone2=contactUs.phone.phone2;
      this.openingTimes=contactUs.opening_times;
    })
  }

  updateContactUs(){
    var data={
      address:{
        line1:this.line1,
        line2:this.line2,
        line3:this.line3,
        line4:this.line4
      },
      opening_times:this.openingTimes,
      phone:{
        phone1:this.phone1,
        phone2:this.phone2
      }
    }

    this.contactUsService.updateContactUs(data).then(()=>{
      this.toaster.success("Contact Us page successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })

  }

}
