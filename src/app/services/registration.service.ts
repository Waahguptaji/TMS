import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
    customerName: string;
    email: string;
    countryCode: string;
    mobile: string;
    address: string;
    userId: string;
    password: string;
    emailNotif: boolean;
    smsNotif: boolean;
    deliveryPreference: string;
  }


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = '/users/register';

  constructor(private http: HttpClient) {}
  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
