import { ReportModule } from './report.module';

describe('ReportModule', () => {
  let reportModule: ReportModule;

  beforeEach(() => {
    reportModule = new ReportModule();
  });

  it('should create an instance', () => {
    expect(reportModule).toBeTruthy();
  });
});
