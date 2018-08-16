import { SellModule } from './sell.module';

describe('SellModule', () => {
  let sellModule: SellModule;

  beforeEach(() => {
    sellModule = new SellModule();
  });

  it('should create an instance', () => {
    expect(sellModule).toBeTruthy();
  });
});
