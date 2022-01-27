import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityRightComponent } from './availability-right.component';

describe('AvailabilityRightComponent', () => {
  let component: AvailabilityRightComponent;
  let fixture: ComponentFixture<AvailabilityRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
