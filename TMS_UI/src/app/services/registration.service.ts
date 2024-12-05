import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
    customerName: string;
    email: string;
    mobileNumber: string;
    mailingAddress: string;
    username: string;
    password: string;
    preferences:string;
    preferredDeliveryTime: string;
}


@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8091/api/users/register';

  constructor(private http: HttpClient) {}
  
  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

