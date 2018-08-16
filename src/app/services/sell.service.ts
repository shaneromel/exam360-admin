import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor(private afs:AngularFirestore) { }

  getSell(){
    return this.afs.doc("pages/sell").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      return data;
    }))
  }

  update(data:string){
    return this.afs.doc("pages/sell").set({data:data});
  }

}
