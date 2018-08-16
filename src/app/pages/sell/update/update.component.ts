import { Component, OnInit } from '@angular/core';
import { SellService } from '../../../services/sell.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data:string;

  constructor(private sellService:SellService, private toaster:ToastrService) { }

  ngOnInit() {
    this.sellService.getSell().subscribe(data=>{
      this.data=data.data;
    })
  }

  update(){
    this.sellService.update(this.data).then(()=>{
      this.toaster.success("Page successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
