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
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData) {
      this.username = userData.username;
    }
  }

  logout(): void {
    localStorage.removeItem("isAuthenticated")
    // localStorage.removeItem('username');
    this.router.navigate(['/customer-login']);
  }
}