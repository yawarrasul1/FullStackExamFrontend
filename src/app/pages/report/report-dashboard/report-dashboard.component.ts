import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
})
export class ReportDashboardComponent implements OnInit {
  totalSales = 0;
  totalUsers = 0;
  recentSales: any[] = [];
  recentUsers: any[] = [];
  loading = true;
  error = '';
  totalOrders: any;
  topProducts: any;
  lowStockItems: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData() {
    this.loading = true;
  let today = new Date();
  
    const startDate = "2025-1-1";
    const endDate = `${today.getFullYear()}-${today.getUTCMonth()}-${today.getDate()}`;
  
    this.reportService.getSalesReport(startDate, endDate).subscribe({
      next: (data) => {
        this.totalSales = data.totalRevenue || 0;
        this.totalOrders = data.totalOrders || 0;
      },
      error: () => (this.error = "Failed to load sales report."),
    });
  
    this.reportService.getTopProducts().subscribe({
      next: (data) => {
        this.topProducts = data.slice(0, 5);
      },
      error: () => (this.error = "Failed to load top products."),
    });
  
     this.reportService.getUserReport().subscribe({
      next: (data) => {
        this.recentUsers = data.slice(0, 5);
        this.totalUsers = data.length;
      },
      error: () => (this.error = "Failed to load user report."),
    });
  
    this.reportService.getInventoryReport().subscribe({
      next: (data) => {
        this.lowStockItems = data;
      },
      error: () => (this.error = "Failed to load inventory report."),
    });
  
    this.loading = false;
  }
  
}
