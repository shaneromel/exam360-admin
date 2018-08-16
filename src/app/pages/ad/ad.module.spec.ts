import { AdModule } from './ad.module';

describe('AdModule', () => {
  let adModule: AdModule;

  beforeEach(() => {
    adModule = new AdModule();
  });

  it('should create an instance', () => {
    expect(adModule).toBeTruthy();
  });
});
