// registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Update interface to match both request and response
interface User {
  customerName: string;
  email: string;
  mobileNumber: string;
  mailingAddress: string;
  username: string;
  password: string;
  preferences: string;
  preferredDeliveryTime: string;
}

interface UserResponse extends User {
  userId: string; // Additional field in response
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8091/api/users/register';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, user);
  }
}
