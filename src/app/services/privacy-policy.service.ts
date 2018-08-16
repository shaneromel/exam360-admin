import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {

  constructor(private afs:AngularFirestore) { }

  getPrivacyPolicy(){
    return this.afs.doc("pages/privacy-policy").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updatePrivacyPolicy(pp:string){
    return this.afs.doc("pages/privacy-policy").set({pp:pp});
  }

}
