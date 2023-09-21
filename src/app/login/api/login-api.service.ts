import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private apiService: ApiService) {}

  login(payload: auth.signInPayload) {
    return this.apiService.postRequest<auth.signInResponse>(
      '/users/sign-in',
      payload,
      false
    );
  }
}
