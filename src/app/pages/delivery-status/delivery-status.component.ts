import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfficerNavbarComponent } from '../../shared/officer-navbar/officer-navbar.component';

interface Booking {
  bookingId: string;
  currentStatus: string;
  lastUpdated: string;
}

@Component({
  selector: 'app-delivery-status',
  standalone: true,
  imports: [CommonModule, FormsModule, OfficerNavbarComponent],
  templateUrl: './delivery-status.component.html',
  styleUrls: ['./delivery-status.component.scss'],
})
export class DeliveryStatusComponent implements OnInit {
  bookingId: string = '';
  booking: Booking | null = null;
  newStatus: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadBooking();
  }

  loadBooking(): void {
    const bookingsData: Booking[] = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );
    this.booking =
      bookingsData.find((b) => b.bookingId === this.bookingId) ?? null;
    if (!this.booking) {
      this.errorMessage = 'Booking not found.';
    }
  }

  updateStatus(): void {
    if (!this.newStatus) {
      this.errorMessage = 'Please select a new status.';
      return;
    }

    if (this.booking) {
      this.booking.currentStatus = this.newStatus;
      this.booking.lastUpdated = new Date().toISOString();

      let bookingsData: Booking[] = JSON.parse(
        localStorage.getItem('bookings') || '[]'
      );
      const index = bookingsData.findIndex(
        (b) => b.bookingId === this.booking?.bookingId
      );
      if (index !== -1) {
        bookingsData[index] = this.booking;
        localStorage.setItem('bookings', JSON.stringify(bookingsData));
        this.successMessage = 'Status updated successfully!';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Error updating booking.';
      }
    } else {
      this.errorMessage = 'No booking loaded.';
    }
  }
}
