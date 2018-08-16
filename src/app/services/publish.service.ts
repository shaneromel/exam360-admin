import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublishService {

  constructor(private afs:AngularFirestore) { }

  getPublish(){
    return this.afs.doc("pages/publish").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      return data;
    }))
  }

  update(data:string){
    return this.afs.doc("pages/publish").set({data:data});
  }

}
