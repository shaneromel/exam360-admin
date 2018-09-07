import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { LocalDataSource } from '../../../../../node_modules/ng2-smart-table';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';

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
      id: {
        title: 'ID',
        type: 'string',
        editable:false
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      url:{
        title:"URL paramerter",
        type:"string"
      }
    }
  };
  categories:any[];
  source:LocalDataSource=new LocalDataSource();

  constructor(private categoryService:CategoryService, private toaster:ToastrService) { }

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
    this.categoryService.addCategory(event.newData).then(()=>{
      this.toaster.success("Category successfully deleted!");
      event.confirm.reject();
    }).catch(err=>{
      this.toaster.error(err.message);
      event.confirm.reject();
    })
  }

}
