import { Injectable } from '@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private afs:AngularFirestore) { }

  updateAboutUs(aboutUs:string){
    return this.afs.doc("pages/about-us").update({introduction:aboutUs});
  }

  getAboutUs(){
    return this.afs.doc("pages/about-us").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateWhatWeDo(data:any){
    return this.afs.doc("pages/about-us").update(data);
  }

}
