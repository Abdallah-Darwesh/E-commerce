import { Component, inject, OnInit } from '@angular/core';
import { LoadingDataComponent } from '../../../Shared/Components/loading-data/loading-data.component';
import { BrandsService } from '../../../Core/Services/brand/brands.service';
import { IBrands } from '../../../Core/Interfaces/IBrands/IBrands';

@Component({
  selector: 'app-brands',
  imports: [LoadingDataComponent],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  // This property holds the API response
  allBrands!: IBrands;

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
      }
    });
  }
}
