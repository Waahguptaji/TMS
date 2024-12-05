// src/app/services/officer-booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingQueryParams {
  customerId?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
}

interface BookingResponse {
  bookings: Booking[];
  totalPages: number;
}

interface Booking {
  customerId: string;
  bookingId: string;
  bookingDate: string;
  receiverName: string;
  deliveryAddress: string;
  amount: number;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class OfficerBookingService {
  private apiUrl = 'https://your-api-endpoint.com/api/officer-bookings'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getBookings(params: BookingQueryParams): Observable<BookingResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.customerId) {
      httpParams = httpParams.set('customerId', params.customerId);
    }

    if (params.startDate) {
      httpParams = httpParams.set('startDate', params.startDate);
    }

    if (params.endDate) {
      httpParams = httpParams.set('endDate', params.endDate);
    }

    return this.http.get<BookingResponse>(this.apiUrl, { params: httpParams });
  }
}
