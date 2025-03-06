import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSecoundBannerHomeComponent } from './hero-secound-banner-home.component';

describe('HeroSecoundBannerHomeComponent', () => {
  let component: HeroSecoundBannerHomeComponent;
  let fixture: ComponentFixture<HeroSecoundBannerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSecoundBannerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSecoundBannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
