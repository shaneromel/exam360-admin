import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    FaqRoutingModule,
    ThemeModule
  ],
  declarations: [AddFaqComponent]
})
export class FaqModule { }
