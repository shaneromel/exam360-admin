import { PublishModule } from './publish.module';

describe('PublishModule', () => {
  let publishModule: PublishModule;

  beforeEach(() => {
    publishModule = new PublishModule();
  });

  it('should create an instance', () => {
    expect(publishModule).toBeTruthy();
  });
});
