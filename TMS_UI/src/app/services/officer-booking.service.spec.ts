import { TestBed } from '@angular/core/testing';

import { OfficerBookingService } from './officer-booking.service';

describe('OfficerBookingService', () => {
  let service: OfficerBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficerBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
