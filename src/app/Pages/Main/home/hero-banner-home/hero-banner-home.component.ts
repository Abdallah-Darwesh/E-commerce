import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-banner-home',
  imports: [CarouselModule],
  templateUrl: './hero-banner-home.component.html',
  styleUrl: './hero-banner-home.component.css'
})
export class HeroBannerHomeComponent {
customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayTimeout:2500,
    navText: ['', ''],
   items:1,
    nav: true
  }
}
