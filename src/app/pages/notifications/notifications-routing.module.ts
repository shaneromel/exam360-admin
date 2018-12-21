import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendNotificationsComponent } from './components/send-notifications/send-notifications.component';

const routes: Routes = [
  {
    path:"send-notifications", component:SendNotificationsComponent
  },
  {
    path:"", redirectTo:"send-notifications", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
