import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EmptyPipe } from 'src/app/pipes/empty.pipe';
import { UserManagementApiService } from '../../api/user-management-api.service';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.scss'],
})
export class AddressesTableComponent implements OnInit {
  @Input() userId!: number;

  addressList: users.userAddress[] = [];

  constructor(
    private datePipe: DatePipe,
    private emptyPipe: EmptyPipe,
    private userManagementApiService: UserManagementApiService
  ) {}

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: users.userAddress) => element.id,
    },
    {
      columnDef: 'receiver-name',
      header: 'Receiver Name',
      cell: (element: users.userAddress) => element.receiverName,
    },
    {
      columnDef: 'receiver-phone',
      header: 'Receiver Phone Number',
      cell: (element: users.userAddress) =>
        `${element.receiverCountryCode} ${element.receiverPhoneNumber}`,
    },
    {
      columnDef: 'address-line-1',
      header: 'Address Line 1',
      cell: (element: users.userAddress) => element.addressLineOne,
    },
    {
      columnDef: 'address-line-2',
      header: 'Address Line 2',
      cell: (element: users.userAddress) =>
        this.emptyPipe.transform(element.addressLineTwo),
    },
    {
      columnDef: 'postcode',
      header: 'Postcode',
      cell: (element: users.userAddress) => element.postcode,
    },
    {
      columnDef: 'city',
      header: 'City',
      cell: (element: users.userAddress) => element.city,
    },
    {
      columnDef: 'state',
      header: 'State',
      cell: (element: users.userAddress) => element.state.name,
    },
    {
      columnDef: 'country',
      header: 'Country',
      cell: (element: users.userAddress) => element.country,
    },
    {
      columnDef: 'is-default',
      header: 'Is Default',
      cell: (element: users.userAddress) => element.isDefault,
    },
    {
      columnDef: 'tag',
      header: 'Tag',
      cell: (element: users.userAddress) => element.tag,
    },
    {
      columnDef: 'created-at',
      header: 'Created At',
      cell: (element: users.userAddress) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  ngOnInit(): void {
    this.userManagementApiService.getUserAddressList().subscribe(addresses => {
      this.addressList = addresses;
    });
  }
}
