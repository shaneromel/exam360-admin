import { DistributorModule } from './distributor.module';

describe('DistributorModule', () => {
  let distributorModule: DistributorModule;

  beforeEach(() => {
    distributorModule = new DistributorModule();
  });

  it('should create an instance', () => {
    expect(distributorModule).toBeTruthy();
  });
});
