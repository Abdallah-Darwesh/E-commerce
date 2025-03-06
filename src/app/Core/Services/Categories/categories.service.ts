import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../../Interfaces/categories/ICategories';
import { Website_Base_Url } from '../../Constants/Website_Base_Url';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<ICategories>{
    return this.http.get<ICategories>(`${Website_Base_Url}/api/v1/categories`)
  }
}
