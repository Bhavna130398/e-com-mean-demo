import { Component, OnInit } from '@angular/core';
import { AuthService } from '@eshop-frontend/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.auth.logout();
  }
}
