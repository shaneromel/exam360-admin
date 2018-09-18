import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ViewButtonComponent } from './components/view-button/view-button.component';

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
  ],
  entryComponents:[ViewButtonComponent]
})
export class EditorsModule { }
