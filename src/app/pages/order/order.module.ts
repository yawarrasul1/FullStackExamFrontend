import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderRoutingModule } from './order-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckoutComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
