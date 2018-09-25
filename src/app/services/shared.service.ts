import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private orderIsSelectedSource=new BehaviorSubject<any>(null);
  private bookIsSelectedSource=new BehaviorSubject<any>(null);

  bookIsSelected=this.bookIsSelectedSource.asObservable();
  orderIsSelected=this.orderIsSelectedSource.asObservable();
  isSelected:boolean;

  constructor() { }

  changeOrderIsSelected(rowData:any){
    this.orderIsSelectedSource.next(rowData);
  }

  changeBookIsSelected(rowData:any){
    this.bookIsSelectedSource.next(rowData);
  }
    
  }
