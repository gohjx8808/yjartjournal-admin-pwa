import { Component, OnInit } from '@angular/core';
import { UserManagementApiService } from './api/user-management-api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userList: users.userData[] = [];

  constructor(private userManagementApiService: UserManagementApiService) {}

  ngOnInit(): void {
    this.userManagementApiService.getAllApi();
    this.userManagementApiService.getUserList().subscribe(users => {
      this.userList = users;
    });
  }
}
