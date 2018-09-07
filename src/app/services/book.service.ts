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

  getPendingBooks(){
    return this.afs.collection("pending_books").snapshotChanges().pipe(map(actions=>{
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

  updatePendingBook(id:string, data:any){
    return this.afs.doc("pending_books/"+id).update(data);
  }

  addBook(data:any){
    return this.afs.collection("pending_books").add(data);
  }

  deleteBook(id:string){
    return this.afs.doc("store/"+id).delete();
  }

  addPendingBook(id:string, book:any){
    return this.afs.doc("pending_books/"+id).set(book);
  }

  deletePendingBook(id:string){
    return this.afs.doc("pending_books/"+id).delete();
  }

  setBook(id:string, book:any){
    return this.afs.doc("store/"+id).set(book);
  }

}
