import { Component, OnInit } from '@angular/core';
import { UserManagementApiService } from './api/user-management-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userList: users.userData[] = [];
  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: users.userData) => `${element.id}`,
    },
    {
      columnDef: 'name',
      header: 'Full Name',
      cell: (element: users.userData) => `${element.name}`,
    },
    {
      columnDef: 'preferredName',
      header: 'Preferred Name',
      cell: (element: users.userData) => element.preferredName || '-',
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: users.userData) => `${element.email}`,
    },
    {
      columnDef: 'phone',
      header: 'Phone Number',
      cell: (element: users.userData) =>
        `+${element.countryCode} ${element.phoneNumber}`,
    },
    {
      columnDef: 'gender',
      header: 'Gender',
      cell: (element: users.userData) => `${element.gender}`,
    },
    {
      columnDef: 'dob',
      header: 'Date of Birth',
      cell: (element: users.userData) => `${element.dob}`,
    },
    {
      columnDef: 'createdAt',
      header: 'Created At',
      cell: (element: users.userData) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor(
    private userManagementApiService: UserManagementApiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userManagementApiService.getAllApi();
    this.userManagementApiService.getUserList().subscribe(users => {
      this.userList = users;
    });
  }
}
