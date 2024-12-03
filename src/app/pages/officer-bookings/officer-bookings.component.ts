// src/app/pages/officer-bookings/officer-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OfficerBookingService } from '../../services/officer-booking.service';
import { OfficerNavbarComponent } from '../../shared/officer-navbar/officer-navbar.component';

interface Booking {
  customerId: string;
  bookingId: string;
  bookingDate: string;
  receiverName: string;
  deliveryAddress: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-officer-bookings',
  standalone: true,
  imports: [CommonModule, OfficerNavbarComponent, ReactiveFormsModule],
  templateUrl: './officer-bookings.component.html',
  styleUrls: ['./officer-bookings.component.scss'],
})
export class OfficerBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  bookingForm: FormGroup;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  constructor(
    private fb: FormBuilder,
    private officerBookingService: OfficerBookingService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      customerId: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.fetchBookings();

    
    this.bookingForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(() => {
          this.currentPage = 1; 
          return of(this.fetchBookings());
        })
      )
      .subscribe();
  }

  loadUserInfo(): void {
    const officerData = JSON.parse(localStorage.getItem('officerData') || '{}');
    if (officerData && officerData.name) {
      (document.getElementById('username') as HTMLElement).innerText =
        officerData.name;
    }
  }

  fetchBookings() {
    const { customerId, startDate, endDate } = this.bookingForm.value;
    return this.officerBookingService
      .getBookings({
        customerId,
        startDate,
        endDate,
        page: this.currentPage,
        pageSize: this.pageSize,
      })
      .subscribe(
        (response) => {
          this.bookings = response.bookings;
          this.totalPages = response.totalPages;
          this.updatePageInfo();
        },
        (error) => {
          console.error('Error fetching bookings:', error);
        }
      );
  }

  searchBookings(): void {
    this.currentPage = 1;
    this.fetchBookings();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchBookings();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchBookings();
    }
  }

  updatePageInfo(): void {
    (
      document.getElementById('pageInfo') as HTMLElement
    ).innerText = `Page ${this.currentPage} of ${this.totalPages}`;
  }

  logout(): void {
    localStorage.removeItem('officerData');
    this.router.navigate(['/']);
  }
}
