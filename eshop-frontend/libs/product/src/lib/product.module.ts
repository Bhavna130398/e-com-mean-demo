import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemsComponent } from './components/product-items/product-items.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { DataTablesModule } from 'angular-datatables';
import { UiModule } from '@eshop-frontend/ui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const route: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
  },
  {
    path: 'category/:categoryId',
    component: ProductListComponent
  },
  {
    path: 'products/:productId',
    component: ProductPageComponent
  }
]
@NgModule({
  imports: [CommonModule,
    HttpClientModule,
    ButtonModule,
    RouterModule.forChild(route),
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RatingModule,
    InputNumberModule,
    UiModule,
    ToastModule
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemsComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemsComponent,
    FeaturedProductComponent,
    ProductListComponent,
    ProductPageComponent,
  ],
  providers: [ProductsSearchComponent, MessageService]
})
export class ProductModule { }
