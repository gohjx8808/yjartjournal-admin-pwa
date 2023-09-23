import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { LoginApiService } from './api/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  submitLoading = false;

  constructor(
    private loginApi: LoginApiService,
    private snackbarService: SnackbarService,
    private router: Router,
    formBuilder: NonNullableFormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit = () => {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.submitLoading = true;
      this.loginApi.login({ ...this.loginForm.value, role: 1 }).subscribe({
        next: res => {
          localStorage.setItem('TOKEN', res.data.accessToken);
          this.submitLoading = false;
          this.router.navigate(['dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitLoading = false;
          this.snackbarService.openErrorSnackbar(err.statusText || 'Error');
        },
      });
    }
  };
}
