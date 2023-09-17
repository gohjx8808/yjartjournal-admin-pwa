import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(payload: auth.signInPayload) {
    return this.http.post(`${environment.apiUrl}/users/sign-in`, payload);
  }
}
