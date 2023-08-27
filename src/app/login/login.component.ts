import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

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
          console.log(res);
        },
        error: () => {
          this.submitLoading = false;
        },
      });
    }
  };
}
