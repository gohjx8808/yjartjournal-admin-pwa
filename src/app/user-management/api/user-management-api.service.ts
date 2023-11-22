import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagementApiService {
  private userList = new Subject<users.userListReponse>();
  private userRoleList = new Subject<users.userRole[]>();
  constructor(private apiService: ApiService) {}

  getUserList = () => this.userList.asObservable();
  getUserRoleList = () => this.userRoleList.asObservable();

  getAllApi = (payload: users.getUserListPayload) =>
    this.apiService
      .postRequest<users.userListReponse>('/admin/user/get-all', payload)
      .subscribe(data => this.userList.next(data.data));

  getUserRoleApi = (payload: users.userIdPayload) =>
    this.apiService
      .postRequest<users.userRole[]>('/admin/user/roles', payload)
      .subscribe(data => {
        this.userRoleList.next(data.data);
      });

  getFormOptions = () =>
    this.apiService.getRequest<users.formOption>('/admin/user/form-options');

  submitAddNewUser = (payload: users.addNewUserPayload) =>
    this.apiService.postRequest('/admin/user/add-new', payload);

  submitUpdateUser = (payload: users.updateUserPayload) =>
    this.apiService.postRequest('/admin/user/update', payload);

  submitDeleteUser = (payload: users.deleteUserPayload) =>
    this.apiService.postRequest('/admin/user/delete', payload);

  getAssignableRole = (payload: users.userIdPayload) =>
    this.apiService.postRequest<globalType.optionData[]>(
      '/admin/user/assignable-roles',
      payload
    );

  submitAddUserRole = (payload: users.addUserRolePayload) =>
    this.apiService.postRequest('/admin/user/role/add', payload);

  submitDeleteUserRole = (payload: users.deleteUserRolePayload) =>
    this.apiService.postRequest('/admin/user/role/delete', payload);
}
