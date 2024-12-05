import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfficerTrackingService } from '../../services/officer-tracking.service';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { OfficerNavbarComponent } from '../../shared/officer-navbar/officer-navbar.component';

interface Parcel {
  bookingId: string;
  customerId: string;
  bookingDate: string;
  status: string;
  receiverName: string;
  deliveryAddress: string;
  deliveryDate?: string;
}

@Component({
  selector: 'app-officer-tracking',
  standalone: true,
  imports: [
    CommonModule,
    OfficerNavbarComponent,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './officer-tracking.component.html',
  styleUrls: ['./officer-tracking.component.scss'],
})
export class OfficerTrackingComponent implements OnInit {
  searchForm: FormGroup;
  parcels: Parcel[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private officerTrackingService: OfficerTrackingService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      customerId: [''],
      bookingId: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();

    // Optional: Fetch recent shipments on load
    this.fetchRecentShipments();

    // Trigger search on form value changes with debounce
    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(() => this.searchParcels())
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

  searchParcels(): Observable<void> {
    const { customerId, bookingId } = this.searchForm.value;
    this.loading = true;

    return this.officerTrackingService
      .searchParcels({ customerId, bookingId })
      .pipe(
        switchMap((parcels: Parcel[]) => {
          this.parcels = parcels;
          this.loading = false;
          return [];
        })
      );
  }

  fetchRecentShipments(): void {
    this.loading = true;
    this.officerTrackingService.getRecentShipments().subscribe(
      (parcels) => {
        this.parcels = parcels;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching recent shipments:', error);
        this.loading = false;
      }
    );
  }

  viewParcelDetails(parcel: Parcel): void {
    // Navigate to a detailed view if needed
    // this.router.navigate(['/parcel-details', parcel.bookingId]);
  }

  logout(): void {
    localStorage.removeItem("isAuthenticated")
    // localStorage.removeItem('username');
    this.router.navigate(['/officer-login']);
  }
}
