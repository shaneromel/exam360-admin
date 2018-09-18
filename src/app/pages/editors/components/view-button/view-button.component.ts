import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'ngx-view-button',
  templateUrl: './view-button.component.html',
  styleUrls: ['./view-button.component.scss']
})
export class ViewButtonComponent implements OnInit {

  renderValue: string;

  @Input() value: string | number;
  @Input() rowData:any;

  isSelected:boolean;

  constructor(private sharedService:SharedService) {
    this.sharedService.orderIsSelected.subscribe(rowData=>{
      this.isSelected=rowData ? true : false;
    })
  }

  ngOnInit() {
  }

  onClick(){
    this.isSelected=!this.isSelected;
    this.sharedService.changeOrderIsSelected(this.isSelected ? this.rowData : null);
  }

}
