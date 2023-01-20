import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean = false;
  constructor(
    private productService: ProductsService,
    private catServ: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryId'] ? this._getProducts([params['categoryId']]) : this._getProducts();
      params['categoryId'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategory();
  }
  private _getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter).subscribe((productData) => {
      this.products = productData;
    });
  }
  private _getCategory() {
    this.catServ.getCategories().subscribe((catData) => {
      this.categories = catData;
    });
  }
  categoryFilter(catData: any) {
    const filterData = catData
      .filter((cat: any) => cat.checked)
      .map((category: any) => category.id);
    this._getProducts(filterData);
  }
}
