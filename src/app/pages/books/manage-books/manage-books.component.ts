import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import * as firebase from 'firebase';
import { SharedService } from '../../../services/shared.service';
import { ViewButtonComponent } from '../components/view-button/view-button.component';

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
      id: {
        title: 'ID',
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

  constructor(private bookService:BookService, private toaster:ToastrService, private sharedService:SharedService) { 
    this.isSelected=false;
  }

  ngOnInit() {

    this.sharedService.bookIsSelected.subscribe(rowData=>{
      if(rowData){
        this.isSelected=true;
        this.book=rowData;
        console.log(rowData)
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
    console.log(event);
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
          this.toaster.success("Book successfully updated!")
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }
  }

  deleteBook(event){
    if(window.confirm("Are you sure you want to delete "+event.data.title+"?")){
      console.log(event.data);

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
