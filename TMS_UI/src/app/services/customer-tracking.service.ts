
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Booking {
  id: number;
  bookingId: string;
  senderName: string;
  senderContact: string | null;
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
export class TrackingService {
  private apiUrl = 'http://localhost:8888/api/bookings'; 

  constructor(private http: HttpClient) {}

  getBookingById(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${bookingId}`);
  }
}

