import { FaqModule } from './faq.module';

describe('FaqModule', () => {
  let faqModule: FaqModule;

  beforeEach(() => {
    faqModule = new FaqModule();
  });

  it('should create an instance', () => {
    expect(faqModule).toBeTruthy();
  });
});
