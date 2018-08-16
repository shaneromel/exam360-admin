import { TestBed, inject } from '@angular/core/testing';

import { PublishService } from './publish.service';

describe('PublishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublishService]
    });
  });

  it('should be created', inject([PublishService], (service: PublishService) => {
    expect(service).toBeTruthy();
  }));
});
