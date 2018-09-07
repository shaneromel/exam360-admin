import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { BooksRoutingModule } from './books-routing.module';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AddBookComponent } from './add-book/add-book.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    ThemeModule,
    SharedModule,
    AngularFireStorageModule,
    NgxMyDatePickerModule.forRoot(),
    TagInputModule
  ],
  declarations: [ManageBooksComponent, BookDetailsComponent, AddBookComponent]
})
export class BooksModule { }
