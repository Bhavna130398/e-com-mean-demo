import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@eshop-frontend/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as i18nIsoCountries from 'i18n-iso-countries';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UsersService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`/user/form/${userId}`);
  }
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(userId).subscribe(
          (response) => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      },
      reject: () => { }
    });
  }
  getCountryName(key) {
    return i18nIsoCountries.getName(key, "en")
  }
}
