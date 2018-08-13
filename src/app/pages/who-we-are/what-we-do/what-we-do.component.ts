import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../../services/about-us.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  freeShipping:string;
  giftCards:string;
  rewardPoints:string;
  easyReturn:string;
  cod:string;
  customerSupport:string;

  constructor(private aboutUsService:AboutUsService, private toaster:ToastrService) { }

  ngOnInit() {
  }

  updateAboutUs(){
    var data={
      free_shipping:this.freeShipping,
      gift_cards:this.giftCards,
      reward_points:this.rewardPoints,
      easy_return:this.easyReturn,
      cod:this.cod,
      customer_support:this.customerSupport
    }
    this.aboutUsService.updateWhatWeDo({what_we_do:data}).then(()=>{
      this.toaster.success("Successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
