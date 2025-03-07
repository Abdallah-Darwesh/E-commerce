import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../Core/Services/Categories/categories.service';
import { ICategories } from '../../../Core/Interfaces/categories/ICategories';
import { LoadingDataComponent } from "../../../Shared/Components/loading-data/loading-data.component";
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-categories',
  imports: [LoadingDataComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']  ,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInSection', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1 }))
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
export class CategoriesComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  allCategories!: ICategories;

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
}
