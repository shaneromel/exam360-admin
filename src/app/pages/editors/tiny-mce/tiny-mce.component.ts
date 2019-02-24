import { WINDOW } from '@ng-toolkit/universal';
import { Component , Inject} from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { ViewButtonComponent } from '../components/view-button/view-button.component';
import { SharedService } from '../../../services/shared.service';
import { ImagesComponent } from '../components/images/images.component';
import { UserService } from '../../../services/user.service';
import { OrderIdComponent } from '../components/order-id/order-id.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl:"tiny-mce.component.html"
})
export class TinyMCEComponent {

  searchBy:string;

  settings={
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
        title: 'Order ID',
        type: 'custom',
        renderComponent:OrderIdComponent,
        editable:false
      },
      details:{
        title:"Product Details",
        type:"custom",
        renderComponent:ProductDetailsComponent,
        editable:false,
        filter:false
      },
      total: {
        title: 'Shipment(₹)',
        type: 'html',
        editable:false,
        valuePrepareFunction:(cell, row)=>{
          return `Grand Total: ${cell}`
        },
        filter:false
      },
      date: {
        title: 'Date(DD/MM/YYYY)',
        type: 'string',
        editable:false,
        filter:false
      },
      button:{
        title:"View",
        type:'custom',
        renderComponent:ViewButtonComponent,
        editable:false,
        filter:false
      }
    },
    actions:{
      add:false,
      edit:false,
      delete:false,
      position: 'right'
    },
  };

  canceledSettings = {
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
        title: 'Order ID',
        type: 'custom',
        renderComponent:OrderIdComponent,
        editable:false
      },
      details:{
        title:"Product Details",
        type:"custom",
        renderComponent:ProductDetailsComponent,
        editable:false,
        filter:false
      },
      total: {
        title: 'Shipment(₹)',
        type: 'html',
        editable:false,
        valuePrepareFunction:(cell, row)=>{
          return `Grand Total: ${cell}`
        },
        filter:false
      },
      date: {
        title: 'Date(DD/MM/YYYY)',
        type: 'string',
        editable:false,
        filter:false
      },
      button:{
        title:"View",
        type:'custom',
        renderComponent:ViewButtonComponent,
        editable:false,
        filter:false
      },
      refunded:{
        title:"Refunded",
        type:"string",
        editor:{
          type:"checkbox",
          config:{
            true:"Yes",
            false:"No"
          }
        },
        filter:false
      }
    },
    actions:{
      add:false,
      edit:false,
      delete:false,
      position: 'right'
    }
  };

  shippedOrders:any[];
  source:LocalDataSource=new LocalDataSource();
  isSelected:boolean;
  order:any;
  unshippedSource:LocalDataSource=new LocalDataSource();
  unshippedOrders:any[];

  canceledSource:LocalDataSource=new LocalDataSource();
  canceledOrders:any[];

  constructor(@Inject(WINDOW) private window: Window, private orderService:OrderService, private toaster:ToastrService, private sharedService:SharedService, private userService:UserService, private rout:ActivatedRoute){
    this.isSelected=false;
    this.searchBy="Order ID";
  }

  route(event){
    console.log(event);
  }

  ngOnInit(){

    this.sharedService.orderIsSelected.subscribe(rowData=>{
      if(rowData){
        this.isSelected=true;
        this.order=rowData
      }else{
        this.isSelected=false;
      }
    })
    this.orderService.getOrders().subscribe(orders=>{
      this.shippedOrders=orders.filter(a=>a.status==="Shipped");
      this.shippedOrders=this.shippedOrders.map(a=>{
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        a.total=a.subTotal+"+"+a.shippingRate
        return a;
      });

      this.rout.params.subscribe(params=>{
        if(params['id']){
          this.isSelected=true;
          this.order=orders.filter(a=>a.id===params['id'])[0];
        }
      });

      this.unshippedOrders=orders.filter(a=>a.status!="Shipped" && a.status!="Canceled");
      this.unshippedOrders=this.unshippedOrders.map(a=>{
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        a.total=a.subTotal+"+"+a.shippingRate
        return a;
      });

      this.canceledOrders=orders.filter(a=>a.status==="Canceled");
      this.canceledOrders=this.canceledOrders.map(a=>{
        if(!a.refunded){
          a.refunded="No";
        }
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        a.total=a.subTotal+"+"+a.shippingRate
        return a;
      });

      console.log(this.unshippedOrders);

      this.unshippedSource.load(this.unshippedOrders);
      this.source.load(this.shippedOrders);
      this.canceledSource.load(this.canceledOrders);
    })
  }

  editOrder(event){
    this.orderService.editOrder(event.newData.id, event.newData).then(()=>{
      this.toaster.success("Order successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);
      event.confirm.reject();
    })
  }

  orderSelected(event){
    this.isSelected=event.isSelected;
    if(this.isSelected){
      this.order=event.data;
    }
  }
  deleteOrder(event){
    if(this.window.confirm("Are you sure you want to delete the order?")){
      this.orderService.deleteOrder(event.data.id).then(()=>{
        this.toaster.success("Order successfully deleted!");
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }
  }

  onSearch(search){
    console.log(search);
  }

}
