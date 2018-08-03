import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    SharedModule
  ],
  declarations: [
    ...routedComponents,
    UserDetailsComponent,
  ],
  providers: [
  ],
})
export class TablesModule { }
