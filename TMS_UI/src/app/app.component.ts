import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) 
  {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
      this.router.navigate(['']);
    }
  }
}
