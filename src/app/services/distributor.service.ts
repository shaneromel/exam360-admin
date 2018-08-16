import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private afs:AngularFirestore) { }

  getDistributor(){
    return this.afs.doc("pages/distributor").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateDistributor(distributor:string){
    return this.afs.doc("pages/distributor").set({data:distributor});
  }

}
