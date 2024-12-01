import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-officer-dashboard',
  standalone: true,
  templateUrl: './officer-dashboard.component.html',
  styleUrls: ['./officer-dashboard.component.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    CountUpModule, // Import CountUpModule here
  ],
})
export class OfficerDashboardComponent implements OnInit {
  // Statistics
  pendingDeliveries: number = 25;
  inTransit: number = 40;
  delivered: number = 15;
  scheduled: number = 10;

  // User Information
  username: string = 'Officer';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();
    // If fetching data asynchronously, call a service here
  }

  loadUserInfo(): void {
    const officerData = JSON.parse(localStorage.getItem('officerData') || '{}');
    if (officerData && officerData.name) {
      this.username = officerData.name;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('officerData');
    this.router.navigate(['/']);
  }
}
