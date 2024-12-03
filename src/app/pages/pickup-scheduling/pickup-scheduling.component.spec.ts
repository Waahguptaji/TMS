import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupSchedulingComponent } from './pickup-scheduling.component';

describe('PickupSchedulingComponent', () => {
  let component: PickupSchedulingComponent;
  let fixture: ComponentFixture<PickupSchedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupSchedulingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickupSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
