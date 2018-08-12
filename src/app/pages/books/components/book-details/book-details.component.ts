import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { AngularFireStorage } from '../../../../../../node_modules/angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { BookService } from '../../../../services/book.service';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';

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
  category:string[];
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

  constructor(private categoryService:CategoryService, private storage:AngularFireStorage, private bookService:BookService, private toaster:ToastrService) {
    this.images=new Array();
   }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
    })
  }

  ngOnChanges(){
    if(this.book){
      this.title=this.book.title;
      this.author=this.book.author;
      this.category=this.book.category_id;
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
    this.image[index].progressBarClass="progress-bar";
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
      type:parseInt(this.type)
    }

    this.bookService.updateBook(this.book.id, data).then(()=>{
      this.toaster.success("Book successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  setStock(){
    this.bookService.updateBook(this.book.id, {stock:this.stock}).then(()=>{
      this.toaster.success("Stock successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  saveImages(){
    var data={
      images:this.images.map(a=>{
        return a.image;
      })
    }
    
    this.bookService.updateBook(this.book.id, data).then(()=>{
      this.toaster.success("Book successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

  setShippingCharges(){
    this.bookService.updateBook(this.book.id, {shipping_cost:this.shippingCharges}).then(()=>{
      this.toaster.success("Shipping Charges successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
    })
  }

}
