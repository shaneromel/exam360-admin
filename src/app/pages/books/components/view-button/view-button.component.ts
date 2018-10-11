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

  constructor(private sharedService:SharedService) { 
    this.sharedService.bookIsSelected.subscribe(rowData=>{
      this.isSelected=rowData ? true : false;
    })
  }

  ngOnInit() {
    
  }

  onClick(){
    this.isSelected=!this.isSelected;
    this.sharedService.changeBookIsSelected(this.isSelected ? this.rowData : null);
  }

}
