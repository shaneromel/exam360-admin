import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StockAlertComponent } from './stock-alert/stock-alert.component';

const routes: Routes = [
  {
    path:"transaction", component:TransactionReportComponent
  },
  {
    path:"", redirectTo:"transaction", pathMatch:"full"
  },
  {
    path:"inventory", component:InventoryComponent
  },
  {
    path:"stock", component:StockAlertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTablesRoutingModule { }
