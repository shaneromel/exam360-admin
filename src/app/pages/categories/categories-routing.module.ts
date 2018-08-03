import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';

const routes: Routes = [{
  path:"manage-categories", component:ManageCategoriesComponent
},
{
  path:'', redirectTo:"manage-categories", pathMatch:"full"
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
