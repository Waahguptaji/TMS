import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CountUpModule } from 'ngx-countup';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'],
  imports: [CommonModule, RouterLink, CustomerNavbarComponent, CountUpModule],
})
export class CustomerDashboardComponent implements OnInit {
  // Statistics
  deliveries: number = 1500;
  cities: number = 50;
  onTimeDelivery: number = 95;
  customerSupport: string = '24/7';

  // User Information
  username: string = 'User';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.name) {
      this.username = userData.name;
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
