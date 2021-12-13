import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionCalculationComponent } from './emision-calculation.component';

describe('CalculationComponent', () => {
  let component: EmisionCalculationComponent;
  let fixture: ComponentFixture<EmisionCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmisionCalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmisionCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
