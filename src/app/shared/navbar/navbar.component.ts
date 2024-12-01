// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit {
  username: string = 'User';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const officerData = JSON.parse(localStorage.getItem('officerData') || '{}');

    if (userData && userData.name) {
      this.username = userData.name;
      this.isAuthenticated = true;
    } else if (officerData && officerData.name) {
      this.username = officerData.name;
      this.isAuthenticated = true;
    }
  }

  logout(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('officerData');
    this.router.navigate(['/']);
  }
}
