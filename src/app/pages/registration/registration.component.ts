// src/app/pages/registration/registration.component.ts
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [FormsModule, CommonModule, RouterLink],
})
export class RegistrationComponent {
  // Personal Information
  customerName: string = '';
  email: string = '';
  countryCode: string = '+1'; // Default value
  mobile: string = '';
  address: string = '';

  // Account Credentials
  userId: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Preferences
  emailNotif: boolean = true;
  smsNotif: boolean = true;
  deliveryPreference: string = 'morning';

  constructor(private router: Router) {}

  handleRegistration(form: NgForm) {
    if (form.valid) {
      // Validate mobile number
      if (!this.validateMobile(this.mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      // Validate password strength
      if (!this.validatePassword(this.password)) {
        alert('Password does not meet the requirements.');
        return;
      }

      // Simulate registration logic
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(
        (user: any) => user.userId === this.userId
      );

      if (existingUser) {
        alert('User ID already exists.');
      } else {
        const newUser = {
          customerName: this.customerName,
          email: this.email,
          countryCode: this.countryCode,
          mobile: this.mobile,
          address: this.address,
          userId: this.userId,
          password: this.password,
          emailNotif: this.emailNotif,
          smsNotif: this.smsNotif,
          deliveryPreference: this.deliveryPreference,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        this.router.navigate(['/']);
      }
    } else {
      // Mark all fields as touched to display validation errors
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  validateMobile(mobile: string): boolean {
    // Remove any non-digit characters and check for exactly 10 digits
    const digits = mobile.replace(/\D/g, '');
    return digits.length === 10;
  }

  validatePassword(password: string): boolean {
    // Password must be at least 8 characters, include uppercase, lowercase, and special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  }
}
