// src/app/pages/customer-tracking/customer-tracking.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';
import { HttpClientModule } from '@angular/common/http';

interface Booking {
  bookingId: string;
  bookingDate: string;
  expectedDeliveryDate: string;
  status: string;
}

@Component({
  selector: 'app-customer-tracking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomerNavbarComponent,
    HttpClientModule,
  ],
  templateUrl: './customer-tracking.component.html',
  styleUrls: ['./customer-tracking.component.scss'],
})
export class CustomerTrackingComponent implements OnInit {
  username: string = 'User';
  bookingIdInput: string = '';
  booking: Booking | null = null;
  showResult: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.name) {
      this.username = userData.name;
    }
  }

  trackParcel(): void {
    this.errorMessage = '';
    this.showResult = false;

    if (!this.bookingIdInput) {
      this.errorMessage = 'Please enter a Booking ID.';
      return;
    }

    const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = bookingsData.find(
      (b: Booking) => b.bookingId === this.bookingIdInput
    );

    if (foundBooking) {
      this.booking = foundBooking;
      this.showResult = true;
    } else {
      this.errorMessage = 'Booking ID not found.';
      this.booking = null;
    }
  }
}
