import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule, HttpClientModule],
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  handleLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.userId, this.password).subscribe({
        next: (response) => {
          // console.log(response);
          if (response.userId === this.userId && response.password === this.password) {
            alert('Login successful!');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userData', JSON.stringify(response))
            this.router.navigate(['customer-dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials!');
        }
      });
    } else {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
}




