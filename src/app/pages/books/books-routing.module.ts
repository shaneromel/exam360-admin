import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [
  {
    path:"manage-books",
    component:ManageBooksComponent
  },
  {
    path:"", redirectTo:"manage-books", pathMatch:"full"
  },
  {
    path:"add-book",  component:AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
