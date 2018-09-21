import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'ngx-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.scss']
})
export class ViewButtonComponent implements OnInit {

  @Input() rowData:any;
  isSelected:boolean;

  constructor(private sharedService:SharedService) { }

  ngOnInit() {
    this.sharedService.bookIsSelected.subscribe(rowData=>{
      if(this.rowData){
        this.isSelected=true;
      }else{
        this.isSelected=false;
      }
    })
  }

  onClick(){
    if(this.isSelected){
      this.sharedService.changeBookIsSelected(null);
    }else{
      this.sharedService.changeBookIsSelected(this.rowData);
    }
  }

}
