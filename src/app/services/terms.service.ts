import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private afs:AngularFirestore) { }

  getTerms(){
    return this.afs.doc("pages/terms").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateTerms(terms:string){
    return this.afs.doc("pages/terms").set({terms:terms});
  }

}
