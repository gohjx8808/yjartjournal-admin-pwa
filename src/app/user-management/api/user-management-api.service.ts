import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagementApiService {
  private userList = new Subject<users.userListReponse>();
  constructor(private apiService: ApiService) {}

  getUserList = () => this.userList.asObservable();

  getAllApi = (payload: users.getUserListPayload) =>
    this.apiService
      .postRequest<users.userListReponse>('/admin/user/get-all', payload)
      .subscribe(data => this.userList.next(data.data));

  getFormOptions = () =>
    this.apiService.getRequest<users.formOption>('/admin/user/form-options');

  submitAddNewUser = (payload: users.addNewUserPayload) =>
    this.apiService.postRequest('/admin/user/add-new', payload);

  submitUpdateUser = (payload: users.updateUserPayload) =>
    this.apiService.postRequest('/admin/user/update', payload);
}
