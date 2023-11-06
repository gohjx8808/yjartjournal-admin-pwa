import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagementApiService {
  private userList = new Subject<users.userData[]>();
  constructor(private apiService: ApiService) {}

  getUserList = () => this.userList.asObservable();

  getAllApi = () =>
    this.apiService
      .getRequest<users.userData[]>('/users/get-all')
      .subscribe(data => this.userList.next(data.data));
}
