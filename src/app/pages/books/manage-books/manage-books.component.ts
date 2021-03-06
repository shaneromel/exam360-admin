import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { BookService } from '../../../services/book.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import * as firebase from 'firebase';
import { SharedService } from '../../../services/shared.service';
import { ViewButtonComponent } from '../components/view-button/view-button.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.scss']
})
export class ManageBooksComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate:true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      sku: {
        title: 'SKU ID',
        type: 'string',
        editable:false
      },
      title: {
        title: 'Title',
        type: 'string',
        editable:false,
        
      },
      author: {
        title: 'Author',
        type: 'string',
        editable:false
      },
      exam360: {
        title: 'Exam 360 exclusive',
        editor:{
          type:"checkbox",
          config:{
            true:"Yes",
            false:"No"
          }
        },
        editable:false
      },
      price_offer: {
        title: 'Price',
        editable:false,
        type: 'number',
      },
      stock:{
        title:"Stock left",
        type:"number",
        editable:false
      },
      is_active:{
        title:"Active",
        editor:{
          type:"checkbox",
          config:{
            true:"Active",
            false:"Inactive"
          }
        },
        filter:{
          type:"checkbox",
          config:{
            true:"Active",
            false:"Inactive"
          }
        },
        filterFunction:(cell,filter)=>{
          return filter===cell;
        }
      },
      button:{
        title:"View",
        type:"custom",
        renderComponent:ViewButtonComponent,
        editable:false
      }
    },
    actions:{
      add:false,
      position: 'right'
    }
  };
  books:any[];
  source:LocalDataSource=new LocalDataSource();
  pendingSource:LocalDataSource=new LocalDataSource();
  isSelected:boolean;
  book:any;
  pendingBooks:any[];

  constructor(@Inject(WINDOW) private window: Window, private bookService:BookService, private toaster:ToastrService, private sharedService:SharedService, private http:HttpClient, private route:ActivatedRoute) { 
    this.isSelected=false;
  }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      if(params['id']){
        this.bookService.getBookById(params['id']).subscribe(book=>{
          this.book=book;
          this.isSelected=true;
        })
      }
    })

    this.sharedService.bookIsSelected.subscribe(rowData=>{
      if(rowData){
        this.isSelected=true;
        this.book=rowData;
      }else{
        this.isSelected=false;
        this.book=null;
      }
    })

    this.bookService.getBooks().subscribe(books=>{
      this.books=books;
      this.source.load(this.books);
    });

    this.bookService.getPendingBooks().subscribe(books=>{
      this.pendingBooks=books;
      this.pendingSource.load(this.pendingBooks);
    })

  }

  bookSelected(event){
    this.isSelected=event.isSelected;
    if(this.isSelected){
      this.book=event.data;
    }
  }

  editBook(event){
    // this.bookService.updateBook(event.newData.id, {is_active:event.newData.is_active}).then(()=>{
    //   if(event.newData.is_active==="Active"){
    //     this.toaster.success("Book successfully activated!");
    //   }else{
    //     this.toaster.success("Book successfully deactivated!");
    //   }
    // }).catch(err=>{
    //   this.toaster.error(err.message);
    //   event.confirm.reject();
    // });
    if(event.newData.is_active==="Inactive"){
      this.bookService.deleteBook(event.data.id).then(()=>{
        this.bookService.addPendingBook(event.data.id,event.newData).then(()=>{
          this.toaster.success("Book successfully updated!");
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }).catch(err=>{
        this.toaster.error(err.message);
      })
      
    }else{
      this.bookService.deletePendingBook(event.data.id).then(()=>{
        this.bookService.setBook(event.data.id, event.newData).then(()=>{

          let headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('authorization',"key=AAAACkszhu0:APA91bFed3TkVNE1A55VXrZMQq4gyA5Vn7C53b4kHZjQPICHbA0YsXZyA-0fZ0jjpd9Dj1whT05ooECbIT3aSTrgpzA6CKuvuIVlWGUvucKWXsiN3jUkHkBmHI5TerRBmrSVDp0yOX82yhcFthGgV8Bfgqz_L08Qlg");

          var data={
            "to": "/topics/all",
              "notification": {
                "title": event.newData.title,
                "body": event.newData.description,
                "icon":event.newData.image,
                "click_action":`https://exam360.in/book/${event.newData.url}`
              },
            "project_id":"exam360-2d6ff"
          }

          this.http.post<any>("https://fcm.googleapis.com/fcm/send",data,{headers:headers}).subscribe(response=>{
            if(response.message_id){
              this.toaster.success("Book successfully updated!")
            }else{
              this.toaster.error("There was some error sending the notification.","Error")
            }
          })

          
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }
  }

  deleteBook(event){
    if(this.window.confirm("Are you sure you want to delete "+event.data.title+"?")){
  
      if(event.data.is_active==="Active"){
        this.bookService.deleteBook(event.data.id).then(()=>{
          this.toaster.success("Book successfully deleted!")
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }else{
        this.bookService.deletePendingBook(event.data.id).then(()=>{
          this.toaster.success("Book successfully deleted!");
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }

    }
  }

}
