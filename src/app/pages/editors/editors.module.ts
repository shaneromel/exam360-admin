import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ViewButtonComponent } from './components/view-button/view-button.component';
import { ImagesComponent } from './components/images/images.component';
import { OrderIdComponent } from './components/order-id/order-id.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  imports: [
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    SharedModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [
    ...routedComponents,
    OrderDetailsComponent,
    ViewButtonComponent,
    ImagesComponent,
    OrderIdComponent,
    ProductDetailsComponent,
  ],
  entryComponents:[ViewButtonComponent, ImagesComponent, OrderIdComponent, ProductDetailsComponent]
})
export class EditorsModule { }
