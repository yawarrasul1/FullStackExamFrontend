import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/order';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
      const token = localStorage.getItem('token');
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }  
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, orderData, { headers: this.getAuthHeaders() });
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/`, { headers: this.getAuthHeaders() });
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`, { headers: this.getAuthHeaders() });
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${orderId}`, {}, { headers: this.getAuthHeaders() });
  }
}
