import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PreviousBookingService } from '../../services/previous-bookings.service';

interface Booking {
  customerId: string;
  bookingId: string;
  bookingDate: string;
  receiverName: string;
  receiverAddress: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-previous-bookings',
  standalone: true,
  imports: [CommonModule, CustomerNavbarComponent, HttpClientModule],
  templateUrl: './previous-bookings.component.html',
  styleUrls: ['./previous-bookings.component.scss'],
})
export class PreviousBookingsComponent implements OnInit {
  username: string = 'User';
  bookings: Booking[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 5;
  errorMessage: string = '';

  constructor(private bookingService: PreviousBookingService) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.username) {
      this.username = userData.username;
    }

    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (response) => {
        this.bookings = response.booking.map((b) => ({
          customerId: b.userId,
          bookingId: b.bookingId,
          bookingDate: b.pickupDate,
          receiverName: b.receiverName,
          receiverAddress: b.receiverAddress,
          amount: b.weight * 10, 
          status: b.status,
        }));
        this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
      },
      error: () => {
        this.errorMessage = 'Failed to load bookings. Please try again later.';
      },
    });
  }

  get paginatedBookings(): Booking[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.bookings.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}



