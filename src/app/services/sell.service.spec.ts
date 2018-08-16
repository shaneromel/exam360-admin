import { TestBed, inject } from '@angular/core/testing';

import { SellService } from './sell.service';

describe('SellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellService]
    });
  });

  it('should be created', inject([SellService], (service: SellService) => {
    expect(service).toBeTruthy();
  }));
});
