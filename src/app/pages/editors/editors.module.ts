import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../@theme/theme.module';

import { EditorsRoutingModule, routedComponents } from './editors-routing.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  imports: [
    ThemeModule,
    EditorsRoutingModule,
    CKEditorModule,
    SharedModule
  ],
  declarations: [
    ...routedComponents,
    OrderDetailsComponent,
  ],
})
export class EditorsModule { }
