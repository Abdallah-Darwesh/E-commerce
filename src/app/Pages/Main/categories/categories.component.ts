import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../Core/Services/Categories/categories.service';
import { ICategories } from '../../../Core/Interfaces/categories/ICategories';
import { LoadingDataComponent } from "../../../Shared/Components/loading-data/loading-data.component";

@Component({
  selector: 'app-categories',
  imports: [LoadingDataComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categoriesService=inject(CategoriesService)

  allCategories!:ICategories

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void{
    this.categoriesService.getAllCategories().subscribe(
      {
        next:response => {
          this.allCategories=response
        }
      }
    )
  }
}
