import { TestBed } from '@angular/core/testing';

import { CustomerBookingService } from './customer-booking.service';

describe('BookingService', () => {
  let service: CustomerBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
