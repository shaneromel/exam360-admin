import { Component, OnInit } from '@angular/core';
import { DistributorService } from '../../../services/distributor.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  data:string;

  constructor(private distributorService:DistributorService, private toaster:ToastrService) { }

  ngOnInit() {
    this.distributorService.getDistributor().subscribe(data=>{
      this.data=data.data;
    });
  }

  update(){
    this.distributorService.updateDistributor(this.data).then(()=>{
      this.toaster.success("Page successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
