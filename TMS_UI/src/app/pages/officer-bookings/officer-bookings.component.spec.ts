import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerBookingsComponent } from './officer-bookings.component';

describe('OfficerBookingsComponent', () => {
  let component: OfficerBookingsComponent;
  let fixture: ComponentFixture<OfficerBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficerBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
