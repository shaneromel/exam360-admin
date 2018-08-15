import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private afs:AngularFirestore) { }

  getContactUs(){
    return this.afs.doc("pages/contact-us").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      return data;
    }))
  }

  updateContactUs(data:any){
    return this.afs.doc("pages/contact-us").update(data);
  }

}
