import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private orderIsSelectedSource=new BehaviorSubject<any>(false);
  orderIsSelected=this.orderIsSelectedSource.asObservable();
  isSelected:boolean;

  constructor() { }

  changeOrderIsSelected(rowData:any){
    this.orderIsSelectedSource.next(rowData);
  }
    
  }
