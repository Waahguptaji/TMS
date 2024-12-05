import { TestBed } from '@angular/core/testing';

import { OfficerTrackingService } from './officer-tracking.service';

describe('OfficerTrackingService', () => {
  let service: OfficerTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficerTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
