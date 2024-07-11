import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneHouseholdComponent } from './one-household.component';

describe('OneHouseholdComponent', () => {
  let component: OneHouseholdComponent;
  let fixture: ComponentFixture<OneHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneHouseholdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
