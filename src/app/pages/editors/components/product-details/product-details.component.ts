import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() rowData:any;

  constructor() { }

  ngOnInit() {
    
  }

}
