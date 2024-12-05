import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
})
export class LoginComponent {
  robotMessage = 'Hello! Welcome back 👋';
  userId: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  handleLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.userId, this.password).subscribe({
        next: (response) => {
          if (
            response.userId === this.userId &&
            response.password === this.password
          ) {
            this.showSuccessMessage('Login successful! Redirecting...');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(response));
            setTimeout(() => {
              this.router.navigate(['customer-dashboard']);
            }, 1000);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.showErrorMessage('Invalid credentials! Please try again.');
        },
      });
    } else {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.showErrorMessage('Please fill all required fields.');
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
