import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../../services/about-us.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUs:string;

  constructor(private aboutUsService:AboutUsService, private toaster:ToastrService) { }

  ngOnInit() {
    this.aboutUsService.getAboutUs().subscribe(aboutUs=>{
      this.aboutUs=aboutUs.introduction;
    })
  }

  updateIntro(){
    this.aboutUsService.updateAboutUs(this.aboutUs).then(()=>{
      this.toaster.success("About Us successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
