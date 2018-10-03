import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() rowData:any;

  constructor() { }

  ngOnInit() {
    this.rowData.cart.map(a=>{
      if(a.deliveryPrice==a.book.shipping_cost.fast_delivery){
        a.deliveryType="Expedite";
      }else{
        a.deliveryType="Regular";
      }
      return a;
    })
  }
}
