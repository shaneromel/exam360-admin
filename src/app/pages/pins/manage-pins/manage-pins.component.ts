import { Component, OnInit } from '@angular/core';
import { PinService } from '../../../services/pin.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-manage-pins',
  templateUrl: './manage-pins.component.html',
  styleUrls: ['./manage-pins.component.scss']
})
export class ManagePinsComponent implements OnInit {

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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      pin:{
        title:"PIN",
        type:"number"
      }
    },
    actions:{
      edit:false
    }
  };
  pins:any[];
  source:LocalDataSource=new LocalDataSource();

  constructor(private pinService:PinService, private toaster:ToastrService) {
    this.pins=new Array();
   }

  ngOnInit() {
    this.pinService.getPins().then(querySnapshot=>{
      querySnapshot.forEach(pin=>{
        var d={
          pin:pin.val()
        };
        this.pins.push(d);
      });
      this.source.load(this.pins);
    });
  }

  deletePin(event){
    if(window.confirm("Are you sure you want to delete "+event.data.pin)){
      this.pins.splice(this.pins.indexOf(event.data),1);
      this.pinService.updatePins(this.pins.map(a=>{return a.pin})).then(()=>{
        this.toaster.success("Pin successfully deleted!");
        event.confirm.resolve();
      }).catch(err=>{
        this.toaster.error(err.message);
        event.confirm.reject();
      })
    }else{
      event.confirm.reject();
    }
  }

  addPin(event){
    event.newData.pin=parseInt(event.newData.pin);
    this.pins.push(event.newData);
    this.pinService.updatePins(this.pins.map(a=>{return a.pin})).then(()=>{
      this.toaster.success("Pin successfully added!");
      this.source.load(this.pins);
      event.confirm.reject();
    }).catch(err=>{
      this.toaster.error(err.message);
      event.confirm.reject();
    })
  }

}
