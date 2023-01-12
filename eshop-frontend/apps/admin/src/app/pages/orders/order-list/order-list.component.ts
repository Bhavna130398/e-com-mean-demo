import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@eshop-frontend/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

const ORDER_STATUS = {
  Pending: {
    label: 'Pending',
    color: 'primary'
  },
  pending: {
    label: 'Pending',
    color: 'primary'
  },
  Processed: {
    label: 'Processed',
    color: 'warning'
  },
  Shipped: {
    label: 'Shipped',
    color: 'success'
  },
  Delivered: {
    label: 'Delivered',
    color: 'success'
  },
  Failed: {
    label: 'Failed',
    color: 'danger'
  }
}
@Component({
  selector: 'admin-order-list',
  templateUrl: './order-list.component.html',
  styles: [
  ]
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(private orderService: OrderService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this._getOrders();

  }
  showOrderDetails(orderId: string) {
    this.router.navigateByUrl(`/order/${orderId}`);
  }
  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteOrder(orderId).subscribe(
          (response) => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      },
      reject: () => { }
    });
  }
  _getOrders() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }
}
