import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ReportTablesRoutingModule } from './report-tables-routing.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ImageComponent } from './inventory/image/image.component';
import { StockAlertComponent } from './stock-alert/stock-alert.component';

@NgModule({
  imports: [
    CommonModule,
    ReportTablesRoutingModule,
    SharedModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [TransactionReportComponent, InventoryComponent, ImageComponent, StockAlertComponent]
})
export class ReportTablesModule { }
