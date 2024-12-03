import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule],
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private router: Router) {}

  handleLogin(form: NgForm) {
    if (form.valid) {
      // Simulate successful login
      const userData = { name: this.userId };
      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/customer-dashboard']);
    } else {
      // Mark all fields as touched to display validation errors
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}
