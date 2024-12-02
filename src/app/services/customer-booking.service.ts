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
}

@Injectable({
  providedIn: 'root',
})
export class CustomerBookingService {
  private apiUrl = 'https://your-api-endpoint.com/bookings'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  createBooking(data: BookingData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
