import { TestBed, inject } from '@angular/core/testing';

import { AboutUsService } from './about-us.service';

describe('AboutUsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutUsService]
    });
  });

  it('should be created', inject([AboutUsService], (service: AboutUsService) => {
    expect(service).toBeTruthy();
  }));
});
