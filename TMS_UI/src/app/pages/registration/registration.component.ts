import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [FormsModule, CommonModule, RouterLink, HttpClientModule, MatSnackBarModule],
})
export class RegistrationComponent {
  customerName: string = '';
  email: string = '';
  countryCode: string = '+91';
  mobileNumber: string = '';
  mailingAddress: string = '';

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  emailNotif: boolean = true;
  smsNotif: boolean = true;
  preferredDeliveryTime: string = 'morning';

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  handleRegistration(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      console.log('Form Data:', formData);

      if (!this.validateMobile(formData.mobile)) {
        this.showErrorSnackBar('Please enter a valid 10-digit mobile number.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        this.showErrorSnackBar('Passwords do not match.');
        return;
      }
      if (!this.validatePassword(formData.password)) {
        this.showErrorSnackBar(
          'Password must be at least 8 characters long and include uppercase letters, lowercase letters, and special characters.'
        );
        return;
      }

      const newUser = {
        customerName: formData.customerName,
        email: formData.email,
        mobileNumber: formData.mobile,
        mailingAddress: formData.address,
        username: formData.userId,
        password: formData.password,
        preferences: formData.emailNotif,
        preferredDeliveryTime: formData.deliveryPreference,
      };

      console.log('New User Data:', newUser);

      this.registrationService.register(newUser).subscribe({
        next: () => {
          this.showSuccessSnackBar('Registration successful!');
          this.router.navigate(['/customer-login']);
        },
        error: (error) => {
          this.showErrorSnackBar('Registration failed. Please try again.');
          console.error('Error:', error);
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

  // SnackBar for error messages
  private showErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  // SnackBar for success messages
  private showSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 500000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}