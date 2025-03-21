import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service'
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  loading: boolean = true;
  noImg = '../../../../assets/no-img.jpg';


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe( {
      next:()=>{
        alert('Product added to cart!');
      },
      error: () => {alert('Failed to add to cart! Please login')
        this.router.navigate(['/login']);
      },

    });
  }
}
