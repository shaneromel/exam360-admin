import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private afs:AngularFirestore) { }

  addFaq(data:any, category:string){
    return this.afs.collection("faq/"+category+"/questions").add(data);
  }

  addCategory(category:string){
    return this.afs.doc("faq/"+category).set({category:category});
  }

}
