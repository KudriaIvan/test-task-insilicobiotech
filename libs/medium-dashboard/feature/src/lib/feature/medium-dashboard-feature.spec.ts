import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediumDashboardFeature } from './medium-dashboard-feature';

describe('MediumDashboardFeature', () => {
  let component: MediumDashboardFeature;
  let fixture: ComponentFixture<MediumDashboardFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumDashboardFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(MediumDashboardFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
