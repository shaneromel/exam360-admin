import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AngularFireStorage } from '../../../../../node_modules/angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { BookService } from '../../../services/book.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { HttpClient } from '@angular/common/http';
import * as globals from '../../../globals';

@Component({
  selector: 'ngx-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  categories:any[];

  image={
    url:"http://newfoundlandsportsman.com/wp-content/uploads/2013/11/dummy-image-landscape.jpg",
    progressBarClass:"progress-bar",
    uploadPercent:0
  }
  softCopy={
    url:"",
    progressBarClass:"progress-bar",
    uploadPercent:0
  }
  title:string;
  author:string;
  category:any[];
  publication:string;
  price:string;
  priceOffer:string;
  type:string;
  description:string;
  exam360:boolean;
  special:boolean;
  stock:number;
  pages:number;
  edition:string;
  languages:string[];
  date:any;
  sku:string;
  dhn:string;
  keywords:string[];
  isbn:string;
  genre:string;
  manName:string;
  manNo:string;
  condition:string;
  weight:string;
  code:string;
  purchasingPrice:string;
  images:any[];
  shippingCharges={
    regular:0,
    fast_delivery:0
  }

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private categoryService:CategoryService, private storage:AngularFireStorage, private bookService:BookService, private toaster:ToastrService, private http:HttpClient) {
    this.special=false;
    this.images=[{
      url:globals.defaultImg,
      progressBarClass:"progress-bar",
      uploadPercent:0
    }]
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
    })
  }

  uploadImage(event, index:number){
    this.images[index].progressBarClass="progress-bar";
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe(percentage=>{
      this.images[index].uploadPercent=percentage;
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() =>{
          fileRef.getDownloadURL().subscribe(url=>{
            this.images[index].url=url;
            this.images[index].progressBarClass="progress-bar bg-success";
          })
        } )
     )
    .subscribe()
  }

  removeImage(index:number){
    this.images.splice(index, 1);
  }

  addImage(){
    this.images.push({
      url:globals.defaultImg,
      uploadPercent:0,
      progressBarClass:"progress-bar"
    })
  }

  uploadMainImage(event) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe(percentage=>{
      this.image.uploadPercent=percentage;
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url=>{
            this.image.url=url;
            this.image.progressBarClass="progress-bar bg-success";
          })
        } )
     )
    .subscribe()
  }

  uploadSoftCopy(event) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    task.percentageChanges().subscribe(percentage=>{
      this.softCopy.uploadPercent=percentage;
    })
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() =>{
          fileRef.getDownloadURL().subscribe(url=>{
            this.softCopy.url=url;
            this.softCopy.progressBarClass="progress-bar bg-success";
          })
        } )
     )
    .subscribe()
  }

  onDateChanged(event: IMyDateModel): void {
    this.date=event;
  }

  addBook(){

    if(parseInt(this.price)<parseInt(this.priceOffer)){
      this.toaster.error("Offer price should be less than selling price.");
      return;
    }

    if(this.images[0].url!=this.image){
      this.images.unshift(this.image);
    }

    var data={
      author:this.author,
      category_id:this.category.map(a=>{return a.id}),
      description:this.description,
      exam360:this.exam360 ? 'Yes' : 'No',
      image:this.image.url,
      images:this.images.map(a=>a.url),
      is_active:"Inactive",
      link:this.softCopy.url,
      price:parseInt(this.price),
      price_offer:parseInt(this.priceOffer),
      publication:this.publication,
      shipping_cost:this.shippingCharges,
      special:this.special,
      stock:this.stock,
      title:this.title,
      type:parseInt(this.type),
      sales:0,
      rating:0,
      languages:this.languages,
      edition:this.edition,
      pages:this.pages,
      publishing_date:this.date,
      sku:"AR-"+this.dhn+"-"+this.sku,
      keywords:this.keywords,
      isbn:this.isbn,
      genre:this.genre,
      timestamp:Date.now(),
      man_no:this.manNo,
      man_name:this.manName,
      url:this.title.toLowerCase().replace(/ /g,"-"),
      condition:this.condition,
      weight:this.weight,
      purchasing_price:parseInt(this.purchasingPrice),
      code:this.code
    }
    
    this.bookService.addBook(data).then(()=>{

      this.toaster.success("Book successfully added!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })

  }

}
