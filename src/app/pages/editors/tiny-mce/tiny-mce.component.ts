import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { ViewButtonComponent } from '../components/view-button/view-button.component';
import { SharedService } from '../../../services/shared.service';

declare var $:any;

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl:"tiny-mce.component.html"
})
export class TinyMCEComponent {

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
        title: 'ID',
        type: 'string',
        editable:false
      },
      user_uid: {
        title: 'User UID',
        type: 'string',
        editable:false
      },
      total: {
        title: 'Total(₹)',
        type: 'number',
        editable:false
      },
      date: {
        title: 'Date(DD/MM/YYYY)',
        type: 'string',
        editable:false
      },
      button:{
        title:"View",
        type:'custom',
        renderComponent:ViewButtonComponent
      }
    },
    actions:{
      add:false,
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
        title: 'ID',
        type: 'string',
        editable:false
      },
      user_uid: {
        title: 'User UID',
        type: 'string',
        editable:false
      },
      total: {
        title: 'Total(₹)',
        type: 'number',
        editable:false
      },
      date: {
        title: 'Date(DD/MM/YYYY)',
        type: 'string',
        editable:false
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
        }
      }
    },
    actions:{
      add:false
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

  constructor(private orderService:OrderService, private toaster:ToastrService, private sharedService:SharedService){
    this.isSelected=false;
    
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
        return a;
      })

      this.unshippedOrders=orders.filter(a=>a.status!="Shipped" && a.status!="Canceled");
      this.unshippedOrders=this.unshippedOrders.map(a=>{
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return a;
      });

      this.canceledOrders=orders.filter(a=>a.status==="Canceled");
      this.canceledOrders=this.canceledOrders.map(a=>{
        if(!a.refunded){
          a.refunded="No";
        }
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return a;
      })

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
    if(window.confirm("Are you sure you want to delete the order?")){
      this.orderService.deleteOrder(event.data.id).then(()=>{
        this.toaster.success("Order successfully deleted!");
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }
  }

}
