import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { TrackingService } from '../../services/customer-tracking.service';

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
  bookingIdInput: string = '';
  booking: Booking | null = null;
  showResult: boolean = false;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private trackingService: TrackingService) {}

  ngOnInit(): void {
    // Initialize any required data
  }

  trackParcel(): void {
    this.errorMessage = '';
    this.showResult = false;
    this.loading = true;

    if (!this.bookingIdInput) {
      this.errorMessage = 'Please enter a Booking ID.';
      this.loading = false;
      return;
    }

    this.trackingService.getBookingById(this.bookingIdInput).subscribe({
      next: (response) => {
        this.booking = {
          bookingId: response.bookingId,
          bookingDate: response.pickupDate,
          expectedDeliveryDate: this.calculateExpectedDelivery(
            response.deliverySpeed
          ),
          status: response.status,
        };
        this.showResult = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Tracking failed:', error);
        this.errorMessage = 'Booking ID not found.';
        this.booking = null;
        this.loading = false;
      },
    });
  }

  private calculateExpectedDelivery(deliverySpeed: string): string {
    const currentDate = new Date();
    let daysToAdd = 0;

    switch (deliverySpeed) {
      case 'standard':
        daysToAdd = 5;
        break;
      case 'express':
        daysToAdd = 3;
        break;
      case 'priority':
        daysToAdd = 1;
        break;
      default:
        daysToAdd = 5;
    }

    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toISOString();
  }
}
