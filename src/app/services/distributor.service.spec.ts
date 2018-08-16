import { TestBed, inject } from '@angular/core/testing';

import { DistributorService } from './distributor.service';

describe('DistributorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributorService]
    });
  });

  it('should be created', inject([DistributorService], (service: DistributorService) => {
    expect(service).toBeTruthy();
  }));
});
