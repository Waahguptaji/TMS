// src/app/shared/officer-navbar/officer-navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-officer-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './officer-navbar.component.html',
  styleUrls: ['./officer-navbar.component.scss'],
})
export class OfficerNavbarComponent implements OnInit {
  username: string = 'Officer';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const officerData = JSON.parse(localStorage.getItem('officerData') || '{}');
    if (officerData && officerData.name) {
      this.username = officerData.name;
    }
  }

  logout(): void {
    localStorage.removeItem('officerData');
    this.router.navigate(['/']);
  }
}
