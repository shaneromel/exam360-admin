import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private afs:AngularFirestore) { }

  getBookById(id:string){
    return this.afs.doc("store/"+id).snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  getBooks(){
    return this.afs.collection("store").snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  updateBook(id:string, data:any){
    return this.afs.doc("store/"+id).update(data);
  }

  addBook(data:any){
    return this.afs.collection("store").add(data);
  }

  deleteBook(id:string){
    return this.afs.doc("store/"+id).delete();
  }

}
