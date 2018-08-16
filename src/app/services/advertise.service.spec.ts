import { TestBed, inject } from '@angular/core/testing';

import { AdvertiseService } from './advertise.service';

describe('AdvertiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertiseService]
    });
  });

  it('should be created', inject([AdvertiseService], (service: AdvertiseService) => {
    expect(service).toBeTruthy();
  }));
});
