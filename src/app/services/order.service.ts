import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs:AngularFirestore) { }

  getOrders(){
    return this.afs.collection("orders", ref=>ref.orderBy("timestamp")).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  getCanceledOrders(){
    return this.afs.collection("orders", ref=>ref.where("status","==","Canceled")).snapshotChanges().pipe(map(actions=>{
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

  updateOrder(id:string, data:any){
    return this.afs.doc("orders/"+id).update(data);
  }

  deleteOrder(id:string){
    return this.afs.doc("orders/"+id).delete();
  }

  getShippedOrders(){
    return this.afs.collection("orders", ref=>ref.where("status","==", "Shipped")).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  getUnshippedOrders(){
    return this.afs.collection("orders",ref=>ref.where("status","==","Under Process")).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  getOrdersTimestamp(timestamp:number){
    return this.afs.collection("orders",ref=>ref.where("timestamp",">=",timestamp)).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  getOrdersInRange(from:number,to:number){
    return this.afs.collection("orders", ref=>ref.where("timestamp",">=",from).where("timestamp","<=",to)).snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

}
