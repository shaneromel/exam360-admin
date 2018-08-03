import { TestBed, inject } from '@angular/core/testing';

import { PinService } from './pin.service';

describe('PinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PinService]
    });
  });

  it('should be created', inject([PinService], (service: PinService) => {
    expect(service).toBeTruthy();
  }));
});
