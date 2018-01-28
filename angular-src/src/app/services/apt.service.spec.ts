import { TestBed, inject } from '@angular/core/testing';

import { AptService } from './apt.service';

describe('AptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AptService]
    });
  });

  it('should be created', inject([AptService], (service: AptService) => {
    expect(service).toBeTruthy();
  }));
});
