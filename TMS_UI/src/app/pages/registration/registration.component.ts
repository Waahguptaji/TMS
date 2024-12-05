import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface UserResponse {
  userId: string;
  customerName: string;
  email: string;
  mobileNumber: string;
  mailingAddress: string;
  username: string;
  password: string;
  preferences: string;
  preferredDeliveryTime: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    HttpClientModule,
    MatSnackBarModule,
  ],
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
        next: (response: UserResponse) => {
          const message = `
            Registration successful!
            Your Credentials:
            Username: ${response.username}
            User ID: ${response.userId}
            Password: ${response.password}
          `;
          this.showSuccessSnackBar(message);

          // Store user data
          localStorage.setItem('userData', JSON.stringify(response));

          // Navigate after 5 seconds
          setTimeout(() => {
            this.router.navigate(['/customer-login']);
          }, 5000);
        },
        error: (error) => {
          this.showErrorSnackBar('Registration failed. Please try again.');
          console.error('Error:', error);
        },
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
      duration: 50000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
