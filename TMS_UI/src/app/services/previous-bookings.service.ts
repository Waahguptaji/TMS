import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingResponse {
  userId: string | null;
  customerName: string | null;
  booking: Array<{
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
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class PreviousBookingService {
  private userData = JSON.parse(localStorage.getItem('userData') || '{}');
  private apiUrl = `http://localhost:8091/api/users/user/bookings/${this.userData.userId}`;

  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookingResponse> {
    return this.http.get<BookingResponse>(this.apiUrl);
  }
}