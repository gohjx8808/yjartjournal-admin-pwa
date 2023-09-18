import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface Response<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getRequest<T>(url: string, auth = true) {
    const token = localStorage.getItem('TOKEN');
    let headers = {};

    if (auth) {
      headers = { Authorization: `Bearer ${token}` };
    }

    return this.http.get<Response<T>>(`${environment.apiUrl}${url}`, {
      headers,
    });
  }

  login(payload: auth.signInPayload) {
    return this.http.post<Response<auth.signInResponse>>(
      `${environment.apiUrl}/users/sign-in`,
      payload
    );
  }

  getYarnStockOverview() {
    return this.getRequest<dashboard.yarnStockOverview>(
      '/dashboard/yarn-stock-overview'
    );
  }
}
