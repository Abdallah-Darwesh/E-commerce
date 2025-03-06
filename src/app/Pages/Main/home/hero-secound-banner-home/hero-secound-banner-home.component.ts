// src/app/YourPath/hero-secound-banner-home.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Core/Services/Categories/categories.service';
import { ICategories } from '../../../../Core/Interfaces/categories/ICategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hero-secound-banner-home',
  imports: [CarouselModule, NgxSpinnerComponent],
  templateUrl: './hero-secound-banner-home.component.html',
  styleUrls: ['./hero-secound-banner-home.component.css']
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

  customOptions: OwlOptions = {
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
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 8 }
    },
    nav: true
  };
}
