import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private afs:AngularFirestore) { }

  getHomeData(){
    return this.afs.doc("home/DOwR2SEx7UGRWmRAudam").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateBanner(banner:any[]){
    return this.afs.doc("home/DOwR2SEx7UGRWmRAudam").update({banner:banner});
  }

  getFooterBanner(){
    return this.afs.doc("home/footer-banners").snapshotChanges().pipe(map(a=>{
      const data=a.payload.data() as any;
      data.id=a.payload.id;
      return data;
    }))
  }

  updateFooterBanner(banner:any[]){
    return this.afs.doc("home/footer-banners").update({banners:banner});
  }

}
