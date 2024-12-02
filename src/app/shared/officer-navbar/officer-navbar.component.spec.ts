import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerNavbarComponent } from './officer-navbar.component';

describe('OfficerNavbarComponent', () => {
  let component: OfficerNavbarComponent;
  let fixture: ComponentFixture<OfficerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficerNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
