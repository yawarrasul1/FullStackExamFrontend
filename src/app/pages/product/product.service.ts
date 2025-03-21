import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) {}

  getProducts(
    search: string = "",
    page: number = 1,
    limit: number = 3
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      params: { search, page, limit },
    });
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }
  
}
