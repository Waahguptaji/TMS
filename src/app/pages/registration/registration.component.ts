import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule],
})
export class RegistrationComponent {
  customerName: string = '';
  email: string = '';
  countryCode: string = '+1';
  mobile: string = '';
  address: string = '';

  userId: string = '';
  password: string = '';
  confirmPassword: string = '';

  emailNotif: boolean = true;
  smsNotif: boolean = true;
  deliveryPreference: string = 'morning';

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  handleRegistration(form: NgForm) {
    if (form.valid) {
      if (!this.validateMobile(this.mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      if (!this.validatePassword(this.password)) {
        alert('Password does not meet the requirements.');
        return;
      }

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

      this.registrationService.register(newUser).subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Registration failed. Please try again.');
          console.error(error);
        },
      });
    } else {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  validateMobile(mobile: string): boolean {
    const digits = mobile.replace(/\D/g, '');
    return digits.length === 10;
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  }
}
