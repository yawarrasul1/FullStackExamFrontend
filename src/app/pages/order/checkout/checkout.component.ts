import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  userDetails = {
    name: '',
    shippingAddress: '',
    paymentMethod: 'Card',
  };

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private route : ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const cartItems = params['cartItems'];
      const total = params['total'];

      if (cartItems && total) {
        this.cartItems = JSON.parse(cartItems);
        this.totalPrice = Number(total);
      } else {
        this.router.navigate(['/cart']);
      }
    });
  }

  placeOrder() {
    if (!this.userDetails.name || !this.userDetails.shippingAddress) {
      alert('Please fill in all the details!');
      return;
    }

    const orderData = {
      items: this.cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total: this.totalPrice,
      userDetails: this.userDetails,
      
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully! 🎉');
        this.cartService.clearCart().subscribe();
        this.router.navigate(['/order/history']);
      },
      error: (err) => {
        console.error('Failed to place order:', err);
        alert('Failed to place order');
      },
    });
  }
}
