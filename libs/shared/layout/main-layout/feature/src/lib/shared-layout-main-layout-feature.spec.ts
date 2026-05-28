import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { provideTaiga } from '@taiga-ui/core';
import { SharedLayoutMainLayoutFeature } from './shared-layout-main-layout-feature';

describe('SharedLayoutMainLayoutFeature', () => {
  let component: SharedLayoutMainLayoutFeature;
  let fixture: ComponentFixture<SharedLayoutMainLayoutFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedLayoutMainLayoutFeature],
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedLayoutMainLayoutFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
