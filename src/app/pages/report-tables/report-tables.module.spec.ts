import { ReportTablesModule } from './report-tables.module';

describe('ReportTablesModule', () => {
  let reportTablesModule: ReportTablesModule;

  beforeEach(() => {
    reportTablesModule = new ReportTablesModule();
  });

  it('should create an instance', () => {
    expect(reportTablesModule).toBeTruthy();
  });
});
