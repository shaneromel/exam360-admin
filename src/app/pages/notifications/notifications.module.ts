import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { SendNotificationsComponent } from './components/send-notifications/send-notifications.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule
  ],
  declarations: [SendNotificationsComponent]
})
export class NotificationsModule { }
