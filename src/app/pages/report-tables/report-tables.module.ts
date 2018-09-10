import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTablesRoutingModule } from './report-tables-routing.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportTablesRoutingModule,
    SharedModule
  ],
  declarations: [TransactionReportComponent]
})
export class ReportTablesModule { }
