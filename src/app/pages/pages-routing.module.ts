import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:"home",
    loadChildren:"./home/home.module#HomeModule"
  },
  {
    path:"categories",
    loadChildren:"./categories/categories.module#CategoriesModule"
  },
  {
    path:"books",
    loadChildren:"./books/books.module#BooksModule"
  }, {
    path: 'orders',
    loadChildren: './editors/editors.module#EditorsModule',
  },
  {
    path:"pins",
    loadChildren:"./pins/pins.module#PinsModule"
  },
 {
    path: 'users',
    loadChildren: './tables/tables.module#TablesModule',
  },{
    path:"profile",
    loadChildren:"./profile/profile.module#ProfileModule"
  },{
    path:"who-we-are",
    loadChildren:"./who-we-are/who-we-are.module#WhoWeAreModule"
  },{
    path:"ad",
    loadChildren:"./ad/ad.module#AdModule"
  },{
    path:"contact-us",
    loadChildren:"./contact-us/contact-us.module#ContactUsModule"
  },{
    path:"faq",
    loadChildren:"./faq/faq.module#FaqModule"
  },{
    path:"terms",
    loadChildren:"./terms/terms.module#TermsModule"
  },{
    path:"privacy-policy",
    loadChildren:"./privacy-policy/privacy-policy.module#PrivacyPolicyModule"
  },{
    path:"distributor",
    loadChildren:"./distributor/distributor.module#DistributorModule"
  },{
    path:"publish",
    loadChildren:"./publish/publish.module#PublishModule"
  },{
    path:"sell",
    loadChildren:"./sell/sell.module#SellModule"
  },{
    path:"report",
    loadChildren:"./report/report.module#ReportModule"
  },{
    path:"report-tables",
    loadChildren:"./report-tables/report-tables.module#ReportTablesModule"
  },{
    path:"notifications",
    loadChildren:"./notifications/notifications.module#NotificationsModule"
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
