import { Component, OnInit } from '@angular/core';
import { AdvertiseService } from '../../../services/advertise.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data:string;

  constructor(private adService:AdvertiseService, private toaster:ToastrService) { }

  ngOnInit() {
    this.adService.getAdvertise().subscribe(data=>{
      this.data=data.data;
    })
  }

  update(){
    this.adService.updateAdvertise(this.data).then(()=>{
      this.toaster.success("Page successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
