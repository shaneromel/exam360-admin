import { PinsModule } from './pins.module';

describe('PinsModule', () => {
  let pinsModule: PinsModule;

  beforeEach(() => {
    pinsModule = new PinsModule();
  });

  it('should create an instance', () => {
    expect(pinsModule).toBeTruthy();
  });
});
