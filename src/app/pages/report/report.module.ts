import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { ReportRoutingModule } from './report-routing.module';



@NgModule({
  declarations: [
    ReportDashboardComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
