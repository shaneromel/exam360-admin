import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from '../../../../../../node_modules/ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { HttpClient, HttpHeaders } from '../../../../../../node_modules/@angular/common/http';
import * as globals from '../../../../globals';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  @Input() order:any;
  books:any;
  user:any;
  courier:string;
  orderConfirm:string;
  trackingNumber:string;
  courierName:string;
  webLink:string;
  cause:string;

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  date:any;
  message:string;

// Initialized to specific date (09.10.2018)

  couriers=[
    {
      title:"INDIAN POST",
      link:"https://www.indiapost.gov.in/VAS/Pages/IndiaPosthome.aspx"
    },
    {
      title:"Trackon Courier",
      link:"http://trackoncourier.com/"
    },
    {
      title:"Fedex",
      link:"https://www.fedex.com/in/index.html"
    },
    {
      title:"Gati",
      link:"https://www.gati.com/track-by-docket/"
    },
    {
      title:"Delhivery",
      link:"https://www.delhivery.com/"
    },
    {
      title:"First Flight",
      link:"http://www.firstflight.net/"
    },
    {
      title:"Blue Dart",
      link:"https://www.bluedart.com/"
    },
    {
      title:"Go Javas",
      link:"http://gojavas.com/docket_details.php?pop=docno&docno"
    },
    {
      title:"DTDC",
      link:"http://www.dtdc.in/"
    },
    {
      title:"On Dot Couriers & Cargo Ltd",
      link:"http://www.ondot.co/"
    },
    {
      title:"Professional Couriers",
      link:"http://www.professionalcouriers.com/"
    },
    {
      title:"Overnight Express",
      link:"Not available"
    },
    {
      title:"The Professional Courier Services",
      link:"http://www.tpcindia.com/"
    },
    {
      title:"Aramex",
      link:"https://www.aramex.com/"
    },
    {
      title:"DHL Courier",
      link:"Not available"
    }
  ];

  constructor(private bookService:BookService, private userService:UserService, private toaster:ToastrService, private orderService:OrderService, private http:HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.order){
      this.order.cart=this.order.cart.map(a=>{
        switch(a.type){
          case 1:
          a.typeName="Hard copy and Soft copy";
          break;
          case 2:
          a.typeName="Soft copy only";
          break;
          default:
          a.typeName="Hard copy only";
        }

        return a;
      })

      this.userService.getUserByUid(this.order.user_uid).subscribe(user=>{
        this.user=user;
      })
    }
  }

  onDateChanged(event){
    this.date=event;
    console.log(this.date);
  }

  confirmOrder(){
    if(this.courier==="others"){
      if(this.trackingNumber && this.courierName){
        var data={
          courier_name:this.courierName,
          tracking_no:this.trackingNumber,
          webLink:this.webLink,
          status:"Shipped",
          date:this.date
        }
        this.orderService.updateOrder(this.order.id, data).then(()=>{
          this.http.post<any>(globals.REST_API+"/confirm-mail/"+this.order.id, {message:this.message}).subscribe(response=>{
            if(response==="success"){
              this.toaster.success("Order successfully shipped!");
            }else{
              this.toaster.error("There was some problem sending the email to the user.");
            }
          })
          
        }).catch(err=>{
          this.toaster.error(err.message);
        })
      }else{
        if(this.trackingNumber){
          this.toaster.error("Courier name missing.")
        }else{
          this.toaster.error("Tracking number missing.")
        }
      }
    }else{
      var courier=this.couriers[parseInt(this.courier)];
      var data={
        courier_name:courier.title,
        tracking_no:this.trackingNumber,
        webLink:courier.link,
        status:"Shipped",
        date:this.date
      }

      this.orderService.updateOrder(this.order.id, data).then(()=>{
        this.http.get<any>(globals.REST_API+"/confirm-mail/"+this.order.id).subscribe(response=>{
          if(response==="success"){
            this.toaster.success("Order successfully shipped!");
          }else{
            this.toaster.error("There was some problem sending the email to the user.");
          }
        })
      }).catch(err=>{
        this.toaster.error(err.message);
      });

    }
  }

  sendCancelMessage(){
    this.http.post<any>(globals.REST_API+"/cancel-mail/"+this.order.id,{cause:this.cause}).subscribe(response=>{
      if(response==="success"){
        this.orderService.updateOrder(this.order.id, {status:"Canceled"}).then(()=>{
          this.toaster.success("Order successfully canceled!")
        }).catch(err=>{
          this.toaster.error(err.message);
        });
      }else{
        this.toaster.error("There was some error while cancelling the order. Please try again.");
      }
    });
  }

}
