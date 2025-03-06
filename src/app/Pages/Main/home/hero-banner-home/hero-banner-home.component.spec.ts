import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBannerHomeComponent } from './hero-banner-home.component';

describe('HeroBannerHomeComponent', () => {
  let component: HeroBannerHomeComponent;
  let fixture: ComponentFixture<HeroBannerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBannerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
