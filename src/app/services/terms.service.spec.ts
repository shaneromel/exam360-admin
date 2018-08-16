import { TestBed, inject } from '@angular/core/testing';

import { TermsService } from './terms.service';

describe('TermsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermsService]
    });
  });

  it('should be created', inject([TermsService], (service: TermsService) => {
    expect(service).toBeTruthy();
  }));
});
