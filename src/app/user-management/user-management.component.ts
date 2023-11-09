import { Component, OnInit } from '@angular/core';
import { UserManagementApiService } from './api/user-management-api.service';
import { DatePipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  userList: users.userData[] = [];
  columns = [
    {
      sortName: 'id',
      columnDef: 'id',
      header: 'ID',
      cell: (element: users.userData) => `${element.id}`,
    },
    {
      sortName: 'name',
      columnDef: 'name',
      header: 'Full Name',
      cell: (element: users.userData) => `${element.name}`,
    },
    {
      sortName: 'preferredName',
      columnDef: 'preferred-name',
      header: 'Preferred Name',
      cell: (element: users.userData) => element.preferredName || '-',
    },
    {
      sortName: 'email',
      columnDef: 'email',
      header: 'Email',
      cell: (element: users.userData) => `${element.email}`,
    },
    {
      sortName: 'phone',
      columnDef: 'phone',
      header: 'Phone Number',
      cell: (element: users.userData) =>
        `+${element.countryCode} ${element.phoneNumber}`,
    },
    {
      sortName: 'gender',
      columnDef: 'gender',
      header: 'Gender',
      cell: (element: users.userData) => `${element.gender}`,
    },
    {
      sortName: 'dob',
      columnDef: 'dob',
      header: 'Date of Birth',
      cell: (element: users.userData) => `${element.dob}`,
    },
    {
      sortName: 'createdAt',
      columnDef: 'created-at',
      header: 'Created At',
      cell: (element: users.userData) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  pagination = {
    pageSize: 10,
    pageIndex: 0,
  };
  totalFiltered = 0;
  sorting: users.sortOption = {
    name: '',
    order: '',
  };

  constructor(
    private userManagementApiService: UserManagementApiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.initUserList();
    this.userManagementApiService.getUserList().subscribe(users => {
      this.userList = users.users;
      this.totalFiltered = users.totalFiltered;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pagination.pageSize = e.pageSize;
    this.pagination.pageIndex = e.pageIndex;
    this.initUserList();
  }

  handleSort(sort: Sort) {
    this.sorting.order = sort.direction as users.sortOrder;
    this.sorting.name = sort.active;
    this.initUserList();
  }

  private initUserList() {
    this.userManagementApiService.getAllApi({
      pagination: {
        page: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize,
      },
      sortBy: {
        order: this.sorting.order,
        name: this.sorting.name,
      },
    });
  }
}
