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
