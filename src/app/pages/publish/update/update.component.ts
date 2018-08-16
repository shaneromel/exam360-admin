import { Component, OnInit } from '@angular/core';
import { PublishService } from '../../../services/publish.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data:string;

  constructor(private publishService:PublishService, private toaster:ToastrService) { }

  ngOnInit() {
    this.publishService.getPublish().subscribe(data=>{
      this.data=data.data;
    })
  }

  update(){
    this.publishService.update(this.data).then(()=>{
      this.toaster.success("Page succesfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
