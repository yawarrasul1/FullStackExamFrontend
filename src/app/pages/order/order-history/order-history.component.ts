import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  styleUrls: ['./order-history.component.scss'],
  templateUrl: './order-history.component.html',
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => (this.orders = orders));  
  }

  cancelOrder(orderId: string) {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Order cancelled!');
        this.ngOnInit();
      },
      error: (err) => console.error('Failed to cancel order', err),
    });
  }
}
