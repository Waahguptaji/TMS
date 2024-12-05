import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8091/api/users/login'; 

  constructor(private http: HttpClient) {}

  login(userId: string, password: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('password', password);
    return this.http.post(this.loginUrl,
      params);

  }
}



