// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { OfficerLoginComponent } from './pages/officer-login/officer-login.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { OfficerDashboardComponent } from './pages/officer-dashboard/officer-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerBookingComponent } from './pages/customer-booking/customer-booking.component';
import { OfficerBookingsComponent } from './pages/officer-bookings/officer-bookings.component';
import { OfficerTrackingComponent } from './pages/officer-tracking/officer-tracking.component';
import { SupportComponent } from './pages/support/support.component';
import { PreviousBookingsComponent } from './pages/previous-bookings/previous-bookings.component';
import { CustomerTrackingComponent } from './pages/customer-tracking/customer-tracking.component';
import { DeliveryStatusComponent } from './pages/delivery-status/delivery-status.component';
import { PickupSchedulingComponent } from './pages/pickup-scheduling/pickup-scheduling.component';
// import { BookingServiceComponent } from './pages/booking-service/booking-service.component';
// import { TrackingComponent } from './pages/tracking/tracking.component';
// import { PreviousBookingComponent } from './pages/previous-booking/previous-booking.component';
// import { SupportComponent } from './pages/support/support.component';
// import { OfficerTrackingComponent } from './pages/officer-tracking/officer-tracking.component';
// import { DeliveryStatusComponent } from './pages/delivery-status/delivery-status.component';
// import { PickupSchedulingComponent } from './pages/pickup-scheduling/pickup-scheduling.component';
// import { OfficerBookingsComponent } from './pages/officer-bookings/officer-bookings.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'officer-login', component: OfficerLoginComponent },
  {
    path: 'customer-dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'officer-dashboard',
    component: OfficerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-booking',
    component: CustomerBookingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'officer-bookings',
    component: OfficerBookingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'officer-tracking',
    component: OfficerTrackingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customer-tracking',
    component: CustomerTrackingComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'previous-booking',
    component: PreviousBookingsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },
  {
    path: 'delivery-status',
    component: DeliveryStatusComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pickup-scheduling',
    component: PickupSchedulingComponent,
    canActivate: [AuthGuard],
  },
];
