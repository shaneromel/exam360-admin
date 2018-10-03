import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import * as globals from '../../../globals';

import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

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
      title: {
        title: 'Title',
        type: 'string',
      },
      url:{
        title:"URL paramerter",
        type:"string"
      },
      description:{
        title:"Description",
        type:"string"
      }
    },
    actions:{
      position:"right"
    }
  };
  categories:any[];
  source:LocalDataSource=new LocalDataSource();

  constructor(private categoryService:CategoryService, private toaster:ToastrService, private http:HttpClient) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories=>{
      this.categories=categories;
      this.source.load(categories);
    })
  }

  editCategory(event){
    delete event.newData.id;
    this.categoryService.updateCategory(event.data.id, event.newData).then(()=>{
      this.toaster.success("Category successfully updated!");
    }).catch(err=>{
      this.toaster.error(err.message);  
    })
  }

  deleteCategory(event){
    if(window.confirm("Are you sure you want to delete category "+event.data.title+"?")){
      this.categoryService.deleteCategory(event.data.id).then(()=>{
        this.toaster.success("Category successfully deleted!");
      }).catch(err=>{
        this.toaster.error(err.message);
      })
    }
  }

  createCategory(event){
    delete event.newData.id;
    var id="AR203-";
    firebase.firestore().doc("category-count/count").get().then(querySnapshot=>{
      var count=this.pad(querySnapshot.data().count+1, 7, "0");
      id=id+count;
      this.categoryService.addCategory(event.newData, id).then(()=>{
        firebase.firestore().doc("category-count/count").update({count:querySnapshot.data().count+1});
        this.http.get<any>(globals.REST_API+"/set-urls").subscribe(response=>{
          if(response.code==="success"){
            this.toaster.success("Category successfully added!");
          }else{
            this.toaster.error(response.message);
          }
        })
        event.confirm.reject();
      }).catch(err=>{
        this.toaster.error(err.message);
        event.confirm.reject();
      })
    })
    
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

}
