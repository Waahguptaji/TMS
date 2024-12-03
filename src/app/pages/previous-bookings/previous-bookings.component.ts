import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';
import { HttpClientModule } from '@angular/common/http';

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

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.name) {
      this.username = userData.name;
    }

    this.loadBookings();
  }

  loadBookings(): void {
    const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');
    this.bookings = bookingsData;
    this.totalPages = Math.ceil(this.bookings.length / this.itemsPerPage);
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
