// src/app/pages/officer-login/officer-login.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-officer-login',
  standalone: true,
  templateUrl: './officer-login.component.html',
  styleUrls: ['./officer-login.component.scss'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class OfficerLoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private router: Router) {}

  handleOfficerLogin(form: NgForm) {
    if (form.valid) {
      // Placeholder for officer authentication logic
      const defaultOfficer = {
        userId: 'OFFICER001',
        password: 'Officer@123',
      };

      if (
        this.userId === defaultOfficer.userId &&
        this.password === defaultOfficer.password
      ) {
        // Simulate successful login
        const officerData = { role: 'officer', name: 'Officer' };
        localStorage.setItem('officerData', JSON.stringify(officerData));
        this.router.navigate(['/officer-dashboard']);
      } else {
        alert('Invalid Officer ID or Password.');
      }
    } else {
      // Mark all fields as touched to display validation errors
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
