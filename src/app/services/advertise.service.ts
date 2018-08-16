import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

  constructor(private afs:AngularFirestore) { }

  getAdvertise(){
    return this.afs.doc("pages/advertise").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateAdvertise(advertise:string){
    return this.afs.doc("pages/advertise").set({data:advertise});
  }

}
