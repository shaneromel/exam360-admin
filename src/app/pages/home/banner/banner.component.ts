import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  banners:any[];

  constructor(private homeService:HomeService, private storage:AngularFireStorage, private toaster:ToastrService) { }

  ngOnInit() {
    this.homeService.getHomeData().subscribe(home=>{
      this.banners=home.banner.map(a=>{
        var data={
          image:a,
          uploadPercent:0,
          progressBarClass:"progress-bar"
        }
        return data;
      });
      console.log(this.banners);
    })
  }

  uploadFile(event, index:number) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe(uploadPercent=>{
      this.banners[index].progressBarClass="progress-bar";
      this.banners[index].uploadPercent=uploadPercent;
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(url=>{
          this.banners[index].image=url;
          this.banners[index].progressBarClass="progress-bar  bg-success";
        }) )
     )
    .subscribe()
  }

  addBannerImage(){
    this.banners.push({
      image:"https://asvs.in/wp-content/uploads/2017/08/dummy.png",
      progressBarClass:"progress-bar",
      uploadPercent:0
    })
  }

  updateBanner(){
    var banner=this.banners.map(a=>{
      return a.image;
    });
    this.homeService.updateBanner(banner).then(()=>{
      this.toaster.success("Banner updated successfully!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  deleteImage(index:number){
    this.banners.splice(index,1);
  }

}
