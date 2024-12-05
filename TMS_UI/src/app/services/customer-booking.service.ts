import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface BookingData {
  senderName: string;
  senderContact: string;
  senderAddress: string;
  receiverName: string;
  receiverContact: string;
  receiverAddress: string;
  receiverPin: string;
  weight: number;
  description: string;
  packaging: string;
  deliverySpeed: string;
  pickupDate: string;
  pickupTime: string;
  userId: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerBookingService {
  private apiUrl = 'http://localhost:8888/api/bookings/register'; 

  constructor(private http: HttpClient) {}

  createBooking(data: BookingData): Observable<any> {
    return this.http.post<string>(this.apiUrl, data,{responseType: 'text' as 'json'});
  }
  
}
