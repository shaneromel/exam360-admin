import { TestBed, inject } from '@angular/core/testing';

import { PrivacyPolicyService } from './privacy-policy.service';

describe('PrivacyPolicyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivacyPolicyService]
    });
  });

  it('should be created', inject([PrivacyPolicyService], (service: PrivacyPolicyService) => {
    expect(service).toBeTruthy();
  }));
});
