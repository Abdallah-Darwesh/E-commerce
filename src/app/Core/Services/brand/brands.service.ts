import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrands } from '../../Interfaces/IBrands/IBrands';
import { Website_Base_Url } from '../../Constants/Website_Base_Url';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private http: HttpClient) { }

  // Get All Brands (limit defaults to 10)
  getAllBrands(limit: number = 10, keyword?: string): Observable<IBrands> {
    let params = new HttpParams().set('limit', limit.toString());
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    return this.http.get<IBrands>(`${Website_Base_Url}/api/v1/brands`, { params });
  }
}
