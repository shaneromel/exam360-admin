import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ThemeModule
  ],
  declarations: [ManageCategoriesComponent]
})
export class CategoriesModule { }
