import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { OrderService } from '../../order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading: boolean = true;
  noImg = '../../../../assets/no-img.jpg';


  constructor(private cartService: CartService,private orderService: OrderService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (items : any) => {
        this.cartItems = items.items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart();
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  
goToCheckout() {
  if (this.cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  this.router.navigate(['/order/checkout'], {
    queryParams: {
      cartItems: JSON.stringify(this.cartItems),
      total: this.getTotalPrice(),
    },
  });
 }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    this.loading = true;

    const orderData = {
      items: this.cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      total: this.getTotalPrice(),
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully! 🎉');
        this.cartService.clearCart().subscribe();
        this.router.navigate(['/orders']);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to place order:', err);
        alert('Failed to place order');
        this.loading = false;
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.loadCart();
    });
  }
}
