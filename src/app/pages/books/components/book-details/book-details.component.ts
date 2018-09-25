import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { AngularFireStorage } from '../../../../../../node_modules/angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { BookService } from '../../../../services/book.service';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import * as firebase from 'firebase';

@Component({
  selector: 'ngx-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  @Input() book:any;
  title:string;
  author:string;
  categories:any[];
  category:any[];
  exam360:boolean;
  publication:string;
  price:number;
  priceOffer:number;
  softCopy={
    url:"",
    progressBarClass:"progress-bar",
    uploadPercent:0
  }
  type:string;
  images:any[];
  description:string;
  image={
    url:"",
    progressBarClass:"progress-bar",
    uploadPercent:0
  }
  special:boolean;
  shippingCharges={
    fast_delivery:0,
    regular:0
  }
  stock:number;
  edition:string;
  languages:string[];
  date:any;
  pages:number;

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  sku:string;
  dhn:string;
  keywords:string[];
  isbn:string;
  genre:string;
  manNo:string;
  manName:string;
  reviews:any[];

  model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(private categoryService:CategoryService, private storage:AngularFireStorage, private bookService:BookService, private toaster:ToastrService) {
    this.images=new Array();
    this.special=false;
   }

  ngOnInit() {
    
  }

  deleteReview(id:string){
    this.bookService.deleteReview(this.book.id, id).then(()=>{
      this.toaster.success("Review successfully deleted!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  updateReview(id:string, review:any){
    console.log(id);
    delete review.id;
    this.bookService.updateReview(this.book.id, id, review).then(()=>{
      this.toaster.success("Review successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  hideReview(id:string){
    this.bookService.updateReview(this.book.id, id, {is_visible: false}).then(()=>{
      this.toaster.success("Review successfully hidden!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  showReview(id:string){
    this.bookService.updateReview(this.book.id, id, {is_visible: true}).then(()=>{
      this.toaster.success("Review successfully restored!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  ngOnChanges(){
    if(this.book){

      this.bookService.getReviews(this.book.id).subscribe(reviews=>{
        this.reviews=reviews;
      })

      this.categoryService.getCategories().subscribe(categories=>{
        this.categories=categories;
        this.category=this.book.category_id.map(a=>{
          var data=this.categories.filter(c=>{
            return c.id===a;
          })[0];
          return data;
        });
  
        this.title=this.book.title;
        this.author=this.book.author;
        
        this.exam360=this.book.exam360;
        this.publication=this.book.publication;
        this.price=this.book.price;
        this.priceOffer=this.book.price_offer;
        this.type=this.book.type;
        this.book.images.forEach(img=>{
          this.images.push({
            image:img,
            uploadPercent:0,
            progressBarClass:"progress-bar"
          })
        })
        this.image.url=this.book.image;
        this.description=this.book.description;
        this.shippingCharges.fast_delivery=this.book.shipping_cost.fast_delivery;
        this.shippingCharges.regular=this.book.shipping_cost.regular;
        this.special=this.book.special;
        this.stock=this.book.stock;
        this.softCopy.url=this.book.link;
        this.languages=this.book.languages;
        this.edition=this.book.edition;
        this.date=this.book.publishing_date;
        this.pages=this.book.pages;
        this.model=this.book.publishing_date;
        this.genre=this.book.genre;
        this.dhn=this.book.dhn;
        this.sku=this.book.sku;
        this.keywords=this.book.keywords;
        this.isbn=this.book.isbn;
        this.manNo=this.book.man_no;
        this.manName=this.book.man_name;
      })
    }
  }

  uploadSoftCopy(event) {
    this.softCopy.progressBarClass="progress-bar";
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
            this.images[index].image=url;
            this.images[index].progressBarClass="progress-bar bg-success";
          })
        } )
     )
    .subscribe()
  }

  onDateChanged(event: IMyDateModel): void {
    this.date=event;
  }

  uploadMainImage(event) {
    this.image.progressBarClass="progress-bar";
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

  removeImage(index:number){
    this.images.splice(index, 1);
  }

  addImage(){
    this.images.push({
      image:"http://newfoundlandsportsman.com/wp-content/uploads/2013/11/dummy-image-landscape.jpg",
      uploadPercent:0,
      progressBarClass:"progress-bar"
    })
  }

  setGeneralDetails(){

    if(this.price<this.priceOffer){
      this.toaster.error("Offer price should be lesser than selling price.");
      return;
    }

    var data={
      title:this.title,
      category_id:this.category,
      description:this.description,
      exam360:this.exam360 ? 'Yes' : 'No', 
      image:this.image.url,
      price:this.price,
      price_offer:this.priceOffer,
      publication:this.publication,
      special:this.special,
      type:parseInt(this.type),
      languages:this.languages,
      edition:this.edition,
      pages:this.pages,
      publishing_date:this.date,
      man_name:this.manName,
      man_no:this.manNo
    }

    this.book.title=this.title;
    this.book.author=this.author;
    this.book.category_id=this.category.map(a=>{return a.id});
    this.book.description=this.description;
    this.book.exam360=this.exam360 ? 'Yes' : 'No';
    this.book.image=this.image.url;
    this.book.price=this.price;
    this.book.price_offer=this.priceOffer;
    this.book.publication=this.publication;
    this.book.special=this.special;
    this.book.type=this.type;
    this.book.languages=this.languages;
    this.book.edition=this.edition;
    this.book.pages=this.pages;
    this.book.publishing_date=this.date;
    this.book.is_active="Inactive";
    this.book.sku=this.sku;
    this.book.dhn=this.dhn;
    this.book.keywords=this.keywords;
    this.book.isbn=this.isbn;
    this.book.genre=this.genre;
    this.book.man_name=this.manName;
    this.book.man_no=this.manNo;
    this.updateBook();
    
  }

  updateBook(){
    // this.bookService.deleteBook(this.book.id).then(()=>{
    //   this.bookService.addPendingBook(this.book.id, this.book).then(()=>{
    //     this.toaster.success("Book successfully updated!")
    //   }).catch(err=>{
    //     this.toaster.error(err.message);
    //   })
    // }).catch(err=>{
    //   this.toaster.error(err.message);
    // })
    console.log(this.book);
    this.bookService.addPendingBook(this.book.id, this.book).then(()=>{
      this.toaster.success("Book successfully updated!")
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  setStock(){
    this.book.stock=this.stock;
    this.updateBook();
  }

  saveImages(){
    this.book.images=this.images.map(a=>{
      return a.image;
    })
    
    this.updateBook();
  }

  setShippingCharges(){
    this.bookService.updateBook(this.book.id, {shipping_cost:this.shippingCharges}).then(()=>{
      this.toaster.success("Shipping Charges successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  ngOnDestroy(){
    this.book=null;
  }

}
