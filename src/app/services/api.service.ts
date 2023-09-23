import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

interface Response<T> {
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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

  postRequest<T>(url: string, payload: any, auth = true) {
    const token = localStorage.getItem('TOKEN');
    let headers = {};

    if (auth) {
      headers = { Authorization: `Bearer ${token}` };
    }

    return this.http.post<Response<T>>(`${environment.apiUrl}${url}`, payload, {
      headers,
    });
  }

  refreshHack(destination: string) {
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([destination]);
      });
  }
}
