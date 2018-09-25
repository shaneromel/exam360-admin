import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:AngularFirestore) { }

  getCategoryById(id:string){
    return this.afs.doc("category/"+id).snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))  
  }

  getCategories(){
    return this.afs.collection("category").snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.id=a.payload.doc.id;
        return data;
      })
    }))
  }

  updateCategory(id:string, data:any){
    return this.afs.doc("category/"+id).update(data);
  }

  addCategory(data:any, id:string){
    return this.afs.doc("category/"+id).set(data);
  }

  deleteCategory(id:string){
    return this.afs.doc("category/"+id).delete();
  }

}
