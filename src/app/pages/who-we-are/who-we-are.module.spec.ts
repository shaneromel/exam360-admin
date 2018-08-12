import { WhoWeAreModule } from './who-we-are.module';

describe('WhoWeAreModule', () => {
  let whoWeAreModule: WhoWeAreModule;

  beforeEach(() => {
    whoWeAreModule = new WhoWeAreModule();
  });

  it('should create an instance', () => {
    expect(whoWeAreModule).toBeTruthy();
  });
});
