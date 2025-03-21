import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5000/api/cart'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCart(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity : 1 }, { headers: this.getAuthHeaders() });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`, { headers: this.getAuthHeaders() });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`, { headers: this.getAuthHeaders() });
  }
}
