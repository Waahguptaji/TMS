// src/app/services/officer-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Parcel {
  bookingId: string;
  customerId: string;
  bookingDate: string;
  status: string;
  receiverName: string;
  deliveryAddress: string;
  deliveryDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OfficerTrackingService {
  private apiUrl = 'https://your-api-endpoint.com/api/officer-parcels'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  searchParcels(params: {
    customerId?: string;
    bookingId?: string;
  }): Observable<Parcel[]> {
    let httpParams = new HttpParams();

    if (params.customerId) {
      httpParams = httpParams.set('customerId', params.customerId);
    }

    if (params.bookingId) {
      httpParams = httpParams.set('bookingId', params.bookingId);
    }

    return this.http.get<Parcel[]>(`${this.apiUrl}/search`, {
      params: httpParams,
    });
  }

  getRecentShipments(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(`${this.apiUrl}/recent`);
  }
}
