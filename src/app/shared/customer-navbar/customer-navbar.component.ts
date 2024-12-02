// src/app/shared/customer-navbar/customer-navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-customer-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss'],
})
export class CustomerNavbarComponent implements OnInit {
  username: string = 'Customer';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.name) {
      this.username = userData.name;
    }
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
}
