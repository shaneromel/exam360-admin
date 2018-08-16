import { PrivacyPolicyModule } from './privacy-policy.module';

describe('PrivacyPolicyModule', () => {
  let privacyPolicyModule: PrivacyPolicyModule;

  beforeEach(() => {
    privacyPolicyModule = new PrivacyPolicyModule();
  });

  it('should create an instance', () => {
    expect(privacyPolicyModule).toBeTruthy();
  });
});
