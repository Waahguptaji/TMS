// src/app/pages/pickup-scheduling/pickup-scheduling.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfficerNavbarComponent } from '../../shared/officer-navbar/officer-navbar.component';

interface Booking {
  bookingId: string;
  customerName: string;
  customerContact: string;
  pickupAddress: string;
  pickupDate?: string;
  pickupTime?: string;
}

@Component({
  selector: 'app-pickup-scheduling',
  standalone: true,
  imports: [CommonModule, FormsModule, OfficerNavbarComponent],
  templateUrl: './pickup-scheduling.component.html',
  styleUrls: ['./pickup-scheduling.component.scss'],
})
export class PickupSchedulingComponent implements OnInit {
  bookingId: string = '';
  booking: Booking | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  minDate: string = '';

  ngOnInit(): void {
    // Set minimum date for date input to today
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;
  }

  searchBooking(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.booking = null;

    if (!this.bookingId) {
      this.errorMessage = 'Please enter a Booking ID.';
      return;
    }

    const bookingsData: Booking[] = JSON.parse(
      localStorage.getItem('bookings') || '[]'
    );
    const foundBooking = bookingsData.find(
      (b) => b.bookingId === this.bookingId
    );

    if (foundBooking) {
      this.booking = foundBooking;
    } else {
      this.errorMessage = 'Booking not found.';
    }
  }

  saveSchedule(): void {
    if (this.booking) {
      if (!this.booking.pickupDate || !this.booking.pickupTime) {
        this.errorMessage = 'Please select pickup date and time.';
        return;
      }

      // Update booking in localStorage
      let bookingsData: Booking[] = JSON.parse(
        localStorage.getItem('bookings') || '[]'
      );
      const index = bookingsData.findIndex(
        (b) => b.bookingId === this.booking?.bookingId
      );
      if (index !== -1) {
        bookingsData[index] = this.booking;
        localStorage.setItem('bookings', JSON.stringify(bookingsData));
        this.successMessage = 'Pickup scheduled successfully!';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Error saving schedule.';
      }
    }
  }
}
