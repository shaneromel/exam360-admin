import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as firebase from 'firebase';

@Component({
  selector: 'ngx-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss']
})
export class TransactionReportComponent implements OnInit {

  settings={
    actions:{
      add:false,
      edit:false,
      delete:false
    },
    columns:{
      date:{
        title:"Date"
      },
      id:{
        title:"Order ID",
        type:"html",
        valuePrepareFunction:(cell,row)=>{
          return '<a href="/#/pages/orders/manage-orders;id='+cell+'" target="_blank">'+row.id+'</a>';
        }
      },
      name:{
        title:"Product Name"
      },
      sku:{
        title:"SKU ID"
      },
      type:{
        title:"Binding Type"
      },
      sp:{
        title:"Selling Price"
      },
      values:{
        title:"Total Values"
      },
      buyer:{
        title:"Buyer Details",
        type:"html"
      },
      status:{
        title:"Shipping Status",
        type:"html"
      }
    }
  };

  range:string;

  books:any[];
  source:LocalDataSource=new LocalDataSource();
  from:number;
  to:number;

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders=>{
      this.books=new Array();
      orders.forEach(order=>{
        var date=new Date(order.timestamp);
        var data={
          date:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
          id:order.id,
          status:order.status+" "+order.tracking_no
        } as any;
        order.cart.forEach(item=>{
          data.name=item.book.title;
          data.sku=item.book.sku;
          data.type=item.typeName;
          data.sp=item.book.price_offer;
          data.values=item.book.price_offer+"+"+item.deliveryPrice;
          data.total=item.book.price_offer+item.deliveryPrice;
          firebase.firestore().doc("users/"+order.user_uid).get().then(doc=>{
            if(doc.exists){
              data.buyer="<ul>"+
              "<li>"+doc.data().first_name+" "+doc.data().last_name+"</li>"+
              "<li>"+doc.data().email+"</li>"+
              "<li>"+doc.data().phone+"</li>"+
              "</ul>";
              this.books.push(data);
              this.source.load(this.books);
            }
          })
          
        })
      })
    })
  }

  exportCsv(){
    var options={
      headers: ["Date", "Order ID", "Product Name","SKU ID","Binding Type","Selling Price","Shipping Price","Total Values","Shipping Status"]
    }
    new Angular5Csv(this.books, 'My Report', options);
  }

  rangeChanged(event){
    var dayTimestamp=24*60*60*1000;
    if(event!="all" && event!="manual"){
      this.orderService.getOrdersTimestamp(Date.now()-parseInt(event)*dayTimestamp).subscribe(orders=>{
        this.books=new Array();
        this.source.load(this.books);
        orders.forEach(order=>{
          var date=new Date(order.timestamp);
          var data={
            date:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
            id:order.id,
            status:order.status+" "+order.tracking_no
          } as any;
          order.cart.forEach(item=>{
            data.name=item.book.title;
            data.sku=item.book.sku;
            data.type=item.typeName;
            data.sp=item.book.price_offer;
            data.shipping_charge=item.deliveryPrice;
            data.total=item.book.price_offer+item.deliveryPrice;
            data.values=item.book.price_offer+"+"+item.deliveryPrice;
            firebase.firestore().doc("users/"+order.user_uid).get().then(doc=>{
              if(doc.exists){
                data.buyer="<ul>"+
                "<li>"+doc.data().first_name+" "+doc.data().last_name+"</li>"+
                "<li>"+doc.data().email+"</li>"+
                "<li>"+doc.data().phone+"</li>"+
                "</ul>";
                this.books.push(data);
                this.source.load(this.books);
              }
            })
          })
        })
      })
    }else{
      this.orderService.getOrders().subscribe(orders=>{
        this.books=new Array();
        orders.forEach(order=>{
          var date=new Date(order.timestamp);
          var data={
            date:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
            id:order.id,
            status:order.status+" "+order.tracking_no
          } as any;
          order.cart.forEach(item=>{
            data.name=item.book.title;
            data.sku=item.book.sku;
            data.type=item.typeName;
            data.sp=item.book.price_offer;
            data.shipping_charge=item.deliveryPrice;
            data.total=item.book.price_offer+item.deliveryPrice;
            data.values=item.book.price_offer+"+"+item.deliveryPrice;
            firebase.firestore().doc("users/"+order.user_uid).get().then(doc=>{
              if(doc.exists){
                data.buyer="<ul>"+
                "<li>"+doc.data().first_name+" "+doc.data().last_name+"</li>"+
                "<li>"+doc.data().email+"</li>"+
                "<li>"+doc.data().phone+"</li>"+
                "</ul>";
                this.books.push(data);
                this.source.load(this.books);
              }
            })
          })
        })
      })
    }
  }

  fromDateChanged(event){
    this.from=event.epoc*1000;
  }

  toDateChanged(event){
    this.to=event.epoc*1000;
  }
  
  applyRange(){
    this.orderService.getOrdersInRange(this.from, this.to).subscribe(orders=>{
      this.books=new Array();
        orders.forEach(order=>{
          var date=new Date(order.timestamp);
          var data={
            date:date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
            id:order.id,
            status:order.status+" "+order.tracking_no
          } as any;
          order.cart.forEach(item=>{
            data.name=item.book.title;
            data.sku=item.book.sku;
            data.type=item.typeName;
            data.sp=item.book.price_offer;
            data.shipping_charge=item.deliveryPrice;
            data.total=item.book.price_offer+item.deliveryPrice;
            data.values=item.book.price_offer+"+"+item.deliveryPrice;
            firebase.firestore().doc("users/"+order.user_uid).get().then(doc=>{
              if(doc.exists){
                data.buyer="<ul>"+
                "<li>"+doc.data().first_name+" "+doc.data().last_name+"</li>"+
                "<li>"+doc.data().email+"</li>"+
                "<li>"+doc.data().phone+"</li>"+
                "</ul>";
                this.books.push(data);
                this.source.load(this.books);
              }
            })
          })
        })
    })
  }

}
