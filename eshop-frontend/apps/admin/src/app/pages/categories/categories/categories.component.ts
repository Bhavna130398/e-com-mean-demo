import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop-frontend/product';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private cs: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.cs.getCategories().subscribe((cats: Category[]) => {
      this.categories = cats;
    });
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cs.deleteCategory(categoryId).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!'
            });
          }
        );
      },
      reject: (err) => {
        console.log(err);
      }
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`/categories/form/${categoryId}`);
  }

  confirm() {
    let flag = false;
    this.confirmationService.confirm({
      message: 'Do you want to delete category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted'
        });
        flag = true;
        return flag;
      }
    });
  }
}
