import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../services/user.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent {

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
      uid: {
        title: 'UID',
        type: 'number',
        editable:false
      },
      first_name: {
        title: 'First Name',
        type: 'string',
      },
      last_name: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      phone: {
        title: 'Phone number',
        type: 'number',
      },
    },
    actions:{
      edit:false
    }
  };

  source: LocalDataSource = new LocalDataSource();
  users:any[];
  user:any;
  isSelected:boolean;

  constructor(private userService:UserService, private toaster:ToastrService) {
    this.isSelected=false;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.userService.deleteUser(event.data.uid).subscribe(response=>{
        if(response.code==="success"){
          this.toaster.success("User successfully deleted!");
          event.confirm.resolve();
        }else{
          this.toaster.error(response.error);
          event.confirm.reject();
        }
      })
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(){
    this.userService.getUsers().subscribe(users=>{
      this.users=users;
      this.source.load(users);
    })
  }

  createUser(event){
    event.newData.phone=event.newData.phone.substring(0,3)==="+91" ? event.newData.phone : "+91"+event.newData.phone;
    this.userService.addUser(event.newData).subscribe(response=>{
      if(response.code==="success"){
        this.toaster.success("User successfully created!");
      }else{
        this.toaster.error(response.error);
      }
    })
  }

  userSelected(event){
    console.log(event.data);
    this.isSelected=event.isSelected;
    if(this.isSelected){
      this.user=event.data;
    }
  }

}
