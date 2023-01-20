import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-product',
  templateUrl: './featured-product.component.html',
  styles: []
})
export class FeaturedProductComponent implements OnInit {
  featuredProducts: Product[] = [];
  constructor(private prodService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProduct();
  }
  private _getFeaturedProduct() {
    this.prodService.getFeaturedProduct(4).subscribe((products) => {
      this.featuredProducts = products;
    });
  }
}
