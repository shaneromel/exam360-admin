import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-stock-alert',
  templateUrl: './stock-alert.component.html',
  styleUrls: ['./stock-alert.component.scss']
})
export class StockAlertComponent implements OnInit {

  settings={
    actions:{
      edit:false,
      delete:false,
      add:false
    },
    columns:{
      status:{
        title:"Status",
        type:"text"
      },
      image:{
        title:"Image",
        type:"html"
      },
      sku:{
        title:"SKU ID",
        type:"text"
      },
      product:{
        title:"Product Name, Language, Binding, Publication, Author",
        type:"html"
      },
      stock:{
        title:"Available stock",
        type:"text"
      },
      manufacturer:{
        title:"Manufacturer details",
        type:"html"
      }
    }
  };

  source:LocalDataSource=new LocalDataSource();

  constructor(private bookService:BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(books=>{
      this.bookService.getPendingBooks().subscribe(pendings=>{
        books.push(...pendings);
        console.log(books);
        var data=new Array();
        var binding;
        books.forEach(book=>{
          switch(book.type){
            case 1:
            binding="Paperback and Soft copy";
            break;
            case 2:
            binding="Soft Copy";
            break;
            case 3:
            binding="Paperback"
            break;
          }
          var d={
            status:book.stock>0 ? book.is_active : "Out of stock",
            image:"<img height='50px' width='50px' src='"+book.image+"'>",
            sku:book.sku,
            product:"<ul>"+
            "<li>Product Name: "+book.title+"</li>"+
            "<li>Languages: "+book.languages.toString()+"</li>"+
            "<li>Binding: "+binding+"</li>"+
            "<li>Publication: "+book.publication+"</li>"+
            "<li>Author: "+book.author+"</li>"+
            "</ul>",
            stock:book.stock,
            manufacturer:"<ul>"+
            "<li>Name: "+book.man_name+"</li>"+
            "<li>Contact number: "+book.man_no+"</li>"+
            "</ul>"
          }
          data.push(d);

        })
        this.source.load(data);
      })
    })
  }

}
