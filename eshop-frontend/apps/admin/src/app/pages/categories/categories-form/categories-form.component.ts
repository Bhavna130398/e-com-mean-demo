import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@eshop-frontend/product';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: []
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  formSubmitted: boolean = false;
  editMode: boolean = false;
  currentCategoryId: any;
  constructor(
    private fb: FormBuilder,
    private cs: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });
    this._checkEditMode();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    };
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.getCategoriesById(params['id']);
      }
    });
  }
  private _addCategory(category: Category) {
    this.cs.createCategory(category).subscribe(
      (response: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category',
          detail: 'Category is created!'
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Category',
          detail: 'Category is not created!'
        });
      }
    );
  }
  private _updateCategory(category: Category) {
    this.cs.updateCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is updated!'
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not updated!'
        });
      }
    );
  }
  getCategoriesById(categoryId: string) {
    this.cs.getCategoriesById(categoryId).subscribe((category) => {
      this.currentCategoryId = category.id;
      this.form.controls['name'].setValue(category.name);
      this.form.controls['icon'].setValue(category.icon);
      this.form.controls['color'].setValue(category.color);
    });
  }
  cancel() {
    this.location.back();
  }
}
