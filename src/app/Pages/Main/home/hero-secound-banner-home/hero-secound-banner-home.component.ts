// src/app/YourPath/hero-secound-banner-home.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Core/Services/Categories/categories.service';
import { ICategories } from '../../../../Core/Interfaces/categories/ICategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hero-secound-banner-home',
  imports: [CarouselModule],
  templateUrl: './hero-secound-banner-home.component.html',
  styleUrls: ['./hero-secound-banner-home.component.css'],
  animations: [
    trigger('fadeInSection', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('500ms {{delay}}ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 }})
    ])
  ]
})
export class HeroSecoundBannerHomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  // Initialize with defaults matching ICategories interface
  allCategories: ICategories = { 
    data: [], 
    message: '', 
    status: '' 
  };

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.ngxSpinnerService.show('loading-3');
    this.categoriesService.getAllCategories().subscribe({
      next: response => {
        // Ensure your response structure contains the "data" property.
        this.allCategories = response;
        this.ngxSpinnerService.hide('loading-3');
      },
      error: err => {
        console.error(err);
        this.ngxSpinnerService.hide('loading-3');
      }
    });
  }

customOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  autoplay: true,
  autoplaySpeed: 2000,
  autoplayTimeout: 2500,
  navText: ['', ''],
  items: 3,
  margin: 24,
  nav: true,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 2
    },
    1024: {
      items: 3
    }
  }
}
}
