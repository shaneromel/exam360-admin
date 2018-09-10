import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';

const routes: Routes = [
  {
    path:"transaction", component:TransactionReportComponent
  },
  {
    path:"", redirectTo:"transaction", pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTablesRoutingModule { }
