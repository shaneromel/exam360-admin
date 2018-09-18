import { Component, OnInit } from '@angular/core';
import { ImageComponent } from './image/image.component';
import { BookService } from '../../../services/book.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  settings={
    actions:{
      add:false,
      edit:false,
      delete:false
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
        title:"Product, Name, Language, Publication, Author",
        type:"html"
      },
      date:{
        title:"Date & Time created",
        type:"html"
      },
      stock:{
        title:"Available stock",
        type:"text"
      },
      mrp:{
        title:"MRP, S.P, Regular Delivery, Expedite Delivery",
        type:"html"
      },
      
    }
  };

  books:any[];
  source:LocalDataSource=new LocalDataSource();

  constructor(private bookService:BookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(books=>{

      this.bookService.getPendingBooks().subscribe(pendings=>{
        books.push(...pendings);
        var data=new Array();
        books.forEach(book=>{
          var date=new Date(book.timestamp);
          var d={
            image:"<img height='50px' width='50px' src='"+book.image+"'>",
            sku:book.sku,
            product:"<ul class='table-list'>"+
            "<li>Product Name: "+book.title+"</li>"+
            "<li>Languages: "+book.languages.toString()+"</li>"+
            "<li>Publication: "+book.publication+"</li>"+
            "<li>Author: "+book.author+"</li>"+
            "</ul>",
            date:"<ul>"+
            "<li>Date: "+(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear())+"</li>"+
            "<li>Time: "+date.getHours()+":"+date.getMinutes()+"</li>"+
            "<ul>",
            stock:book.stock,
            mrp:"<ul>"+
            "<li>MRP: ₹"+book.price_offer+"</li>"+
            "<li>Regular delivery: ₹"+book.shipping_cost.regular+"</li>"+
            "<li>Expedite delivery: ₹"+book.shipping_cost.fast_delivery+"</li>"+
            "</ul>",
            status:book.stock>0 ? book.is_active : "Out of stock"
          }
          data.push(d);
        });
        this.source.load(data);
        })
    })
  }

}
