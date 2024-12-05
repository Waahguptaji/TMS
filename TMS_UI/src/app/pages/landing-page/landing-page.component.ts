import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [CountUpModule, RouterModule, CommonModule],
})
export class LandingPageComponent {
  yearsOfExcellence: number = 13;
  successfulDeliveries: number = 1000000;
  happyCustomers: number = 50000;

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
