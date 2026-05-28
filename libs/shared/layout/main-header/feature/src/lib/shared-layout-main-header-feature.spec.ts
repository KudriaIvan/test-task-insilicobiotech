import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { SharedLayoutMainHeaderFeature } from './shared-layout-main-header-feature';

describe('SharedLayoutMainHeaderFeature', () => {
  let component: SharedLayoutMainHeaderFeature;
  let fixture: ComponentFixture<SharedLayoutMainHeaderFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedLayoutMainHeaderFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedLayoutMainHeaderFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
