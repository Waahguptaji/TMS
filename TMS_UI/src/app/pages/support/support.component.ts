
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerNavbarComponent } from '../../shared/customer-navbar/customer-navbar.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, CustomerNavbarComponent],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  username: string = 'User';

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData && userData.name) {
      this.username = userData.name;
    }
  }
}

