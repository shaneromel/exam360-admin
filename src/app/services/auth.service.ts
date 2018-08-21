import { Injectable } from '@angular/core';
import * as globals from '../globals';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, public afAuth:AngularFireAuth, private afs:AngularFirestore) { }

  getToken(email:string, password:string){
    return this.http.post<any>(globals.REST_API+"/getToken/", {email:email, password:password});
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  getUserbyUid(uid:string){
    return this.afs.doc("admin/"+uid).snapshotChanges().pipe(map(a=>{
      const data=a.payload.data();
      return data;
    }))
  }

  changePassword(newPass:string, uid:string){
    return this.afs.doc("admin/"+uid).update({password:newPass});
  }

}
