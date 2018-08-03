import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { map } from '../../../node_modules/rxjs/operators';
import * as globals from '../globals';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs:AngularFirestore, private http:HttpClient) { }

  getUsers(){
    return this.afs.collection("users").snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as any;
        data.uid=a.payload.doc.id;
        return data;
      })
    }))
  }

  addUser(user:any){
    return this.http.post<any>(globals.REST_API+"/add-user", user);
  }

  deleteUser(uid:string){
    return this.http.post<any>(globals.REST_API+"/delete-user", {uid:uid});
  }

  getUserByUid(uid:string){
    return this.afs.doc("users/"+uid).snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.uid=a.payload.id;
      return data;
    }))
  }

}
