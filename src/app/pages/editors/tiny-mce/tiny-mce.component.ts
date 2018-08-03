import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl:"tiny-mce.component.html",
})
export class TinyMCEComponent {

  settings = {
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
      status: {
        title: 'Status',
        type: 'string',
        editor:{
          type:"list",
          config:{
            list:[
              {
                value:"Waiting for approval",
                title:"Waiting for approval"
              },
              {
                value:"Processing",
                title:"Processing"
              },
              {
                value:"Delivered",
                title:"Delivered"
              }
            ]
          }
        }
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
    },
    actions:{
      add:false
    }
  };
  orders:any[];
  source:LocalDataSource=new LocalDataSource();
  isSelected:boolean;
  order:any;

  constructor(private orderService:OrderService, private toaster:ToastrService){
    this.isSelected=false;
  }

  ngOnInit(){
    this.orderService.getOrders().subscribe(orders=>{
      this.orders=orders;
      this.orders=this.orders.map(a=>{
        var date=new Date(a.timestamp);
        a.date=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        return a;
      })
      this.source.load(this.orders);
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
