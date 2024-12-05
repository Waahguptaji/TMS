import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-officer-login',
  standalone: true,
  templateUrl: './officer-login.component.html',
  styleUrls: ['./officer-login.component.scss'],
  imports: [FormsModule, CommonModule, RouterLink, MatSnackBarModule],
})
export class OfficerLoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  handleOfficerLogin(form: NgForm) {
    if (form.valid) {
      const defaultOfficer = {
        userId: 'OFFICER001',
        password: 'Officer@123',
      };

      if (
        this.userId === defaultOfficer.userId &&
        this.password === defaultOfficer.password
      ) {
        const officerData = { role: 'officer', name: 'Officer' };
        localStorage.setItem('officerData', JSON.stringify(officerData));
        this.showSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          this.router.navigate(['/officer-dashboard']);
        }, 1000);
      } else {
        this.showErrorMessage('Invalid Officer ID or Password.');
      }
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
