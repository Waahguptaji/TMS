import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerTrackingComponent } from './officer-tracking.component';

describe('OfficerTrackingComponent', () => {
  let component: OfficerTrackingComponent;
  let fixture: ComponentFixture<OfficerTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficerTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
