import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediumDashboardStore } from '@test-task-insilicobiotech/medium-dashboard/data-access';
import { MediumDashboardFeature } from './medium-dashboard-feature';

describe('MediumDashboardFeature', () => {
  let component: MediumDashboardFeature;
  let fixture: ComponentFixture<MediumDashboardFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediumDashboardFeature],
      providers: [
        {
          provide: MediumDashboardStore,
          useValue: {
            medium: signal(null),
            isLoading: signal(false),
            error: signal(null),
            loadMedium: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediumDashboardFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
