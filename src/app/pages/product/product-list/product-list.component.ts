import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  noImg = '../../../../assets/no-img.jpg';
  searchTerm: string = "";
  currentPage: number = 1;
  totalPages: number = 1;
  limit : number = 3;

  constructor(private productService: ProductService, private cartService: CartService,private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.searchTerm, this.currentPage, this.limit)
      .subscribe({
        next: (data) => {
          this.products = data.products;
          this.totalPages = data.pages;
        },
        error: (error) => console.error("Failed to load products:", error),
      });
  }
  viewProduct(productId: string): void {
   this.router.navigate([`/products/${productId}`]);
  }

  addToCart(e:any,productId: string) {
    e.stopPropagation();
    this.cartService.addToCart(productId).subscribe({
      next: () => alert('Product added to cart!'),
      error: () => alert('Failed to add to cart! Please login'),
    });
  }
  
  onSearch(): void {
    this.currentPage = 1;  
    this.loadProducts();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  clearSearch(){
    this.searchTerm = "";
    this.currentPage = 1;
    this.loadProducts();
  }
  
}
