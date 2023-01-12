import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@eshop-frontend/users';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoriesComponent } from './pages/categories/categories/categories.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
const Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'product/form',
        component: ProductsFormComponent
      },
      {
        path: 'product/form/:id',
        component: ProductsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'user/form',
        component: UserFormComponent
      },
      {
        path: 'user/form/:id',
        component: UserFormComponent
      },
      {
        path: 'orders',
        component: OrderListComponent
      },
      {
        path: 'order/:id',
        component: OrderDetailsComponent
      },
    ]
  },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(Routes, { initialNavigation: 'enabledBlocking' }),],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
