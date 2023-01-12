import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@eshop-frontend/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as i18nIsoCountries from 'i18n-iso-countries';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {
  editMode = false;
  formSubmitted = false;
  form: FormGroup;
  currentUserId: String;
  countries = [];
  constructor(private fb: FormBuilder, private userService: UsersService, private messageService: MessageService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      isAdmin: [false, Validators.required],
      password: [''],
      token: [''],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
    });
    this._checkEditMode();
    this._getCountries();
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.form.invalid) return;
    if (this.editMode) {
      this._updateProduct(this.form.value)
    } else {
      this._createUser(this.form.value);
    }
  }
  private _createUser(userData: User) {
    this.userService.createUser(userData).subscribe(
      (response: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is created!'
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
          detail: 'User is not created!'
        });
      }
    );
  }
  private _updateProduct(userData: User) {
    this.userService.updateUser(this.currentUserId, userData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User is updated!'
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
          detail: 'User is not updated!'
        });
      }
    );
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.getUserById(params['id']);
      }
    });
  }
  private _getCountries() {
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(i18nIsoCountries.getNames("en", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  getUserById(userId: String) {
    this.userService.getUserById(userId).subscribe(user => {
      this.currentUserId = user.id;
      Object.keys(this.form.controls).map(key => {
        this.form.controls[key].setValue(user[key])
      })
    })
  }
  cancel() {
    this.location.back();
  }
}
