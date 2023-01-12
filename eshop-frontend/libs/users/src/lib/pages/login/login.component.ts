import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted = false;
  authError: any = ''
  constructor(private fb: FormBuilder, private auth: AuthService, private localStorage: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  submit() {
    this.formSubmitted = true;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
      if (response) {
        this.localStorage.setToken(response.token);
        this.router.navigateByUrl('/')
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === 400)
        this.authError = 'Invalid login details!';
      else
        this.authError = 'Internal server error please try again after sometime!';
    })
  }
}
