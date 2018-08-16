import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  data:string;

  constructor(private reportService:ReportService, private toaster:ToastrService) { }

  ngOnInit() {
    this.reportService.getReport().subscribe(data=>{
      this.data=data.data;
    })
  }


  update(){
    this.reportService.update(this.data).then(()=>{
      this.toaster.success("Page successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
