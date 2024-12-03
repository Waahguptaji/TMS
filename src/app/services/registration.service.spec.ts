import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService],
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser = {
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      countryCode: '+1',
      mobile: '1234567890',
      address: '123 Main St',
      userId: 'johndoe',
      password: 'P@ssw0rd!',
      emailNotif: true,
      smsNotif: true,
      deliveryPreference: 'morning',
    };

    service.register(mockUser).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/api/users/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
