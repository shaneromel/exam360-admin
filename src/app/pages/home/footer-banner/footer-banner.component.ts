import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-footer-banner',
  templateUrl: './footer-banner.component.html',
  styleUrls: ['./footer-banner.component.scss']
})
export class FooterBannerComponent implements OnInit {

  banners:any[];

  constructor(private homeService:HomeService, private  storage:AngularFireStorage, private toaster:ToastrService){ }

  ngOnInit() {
    this.homeService.getFooterBanner().subscribe(banners=>{
      this.banners=banners.banners.map(a=>{
        var data={
          image:a.image,
          link:a.link,
          progressBarClass:"progress-bar",
          uploadPercent:0
        }
        return data;
      })
      console.log(banners);
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
      uploadPercent:0,
      link:""
    })
  }

  updateBanner(){
    var banner=this.banners.map(a=>{
      return {image:a.image, link:a.link};
    });
    this.homeService.updateFooterBanner(banner).then(()=>{
      this.toaster.success("Banner updated successfully!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  deleteImage(index:number){
    this.banners.splice(index,1);
  }

}