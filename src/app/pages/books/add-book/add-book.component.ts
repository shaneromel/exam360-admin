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

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private categoryService:CategoryService, private storage:AngularFireStorage, private bookService:BookService, private toaster:ToastrService, private http:HttpClient) {
    this.special=false;
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
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

    var data={
      author:this.author,
      category_id:this.category.map(a=>{return a.id}),
      description:this.description,
      exam360:this.exam360 ? 'Yes' : 'No',
      image:this.image.url,
      images:["http://newfoundlandsportsman.com/wp-content/uploads/2013/11/dummy-image-landscape.jpg"],
      is_active:"Inactive",
      link:this.softCopy.url,
      price:parseInt(this.price),
      price_offer:parseInt(this.priceOffer),
      publication:this.publication,
      shipping_cost:{
        fast_delivery:0,
        regular:0
      },
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
      man_name:this.manName
    }
    
    this.bookService.addBook(data).then(()=>{

      this.http.get<any>(globals.REST_API+"/set-product-urls");

      this.toaster.success("Book successfully added!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })

  }

}
