import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  private apiUrl = 'http://localhost:5000/api/report'; 
  

    private getAuthHeaders() {
      const token = localStorage.getItem('token'); 
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

  constructor(private http: HttpClient) {}

  getSalesReport(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);
    return this.http.get(`${this.apiUrl}/sales`, { params ,  headers: this.getAuthHeaders() });
  }

  getTopProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-products`, { headers: this.getAuthHeaders() });
  }

  getUserReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-summary`, { headers: this.getAuthHeaders() });
  }

  getInventoryReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inventory`, { headers: this.getAuthHeaders() });
  }
}
