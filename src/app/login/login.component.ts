import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private api: ApiService,
    private snackbar: MatSnackBar,
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
      this.api.login({ ...this.loginForm.value, role: 1 }).subscribe({
        next: res => {
          this.submitLoading = false;
          this.router.navigate(['dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitLoading = false;
          this.snackbar.open(err.statusText || 'Error', 'CLOSE', {
            duration: 5000,
            panelClass: 'app-notification-error',
          });
        },
      });
    }
  };
}
