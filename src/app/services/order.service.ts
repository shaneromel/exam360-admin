import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs:AngularFirestore) { }

  getOrders(){
    return this.afs.collection("orders").snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  editOrder(id:string, data:any){
    return this.afs.doc("orders/"+id).set(data);
  }

  deleteOrder(id:string){
    return this.afs.doc("orders/"+id).delete();
  }

}
