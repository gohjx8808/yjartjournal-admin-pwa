import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EmptyPipe } from 'src/app/pipes/empty.pipe';
import { UserManagementApiService } from '../../api/user-management-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAddressDialogComponent } from './dialogs/add-edit-address-dialog/add-edit-address-dialog/add-edit-address-dialog.component';
import { DeleteAddressDialogComponent } from './dialogs/delete-address-dialog/delete-address-dialog/delete-address-dialog.component';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.scss'],
})
export class AddressesTableComponent implements OnInit {
  @Input() userId!: number;

  addressList: address.userAddress[] = [];

  constructor(
    private datePipe: DatePipe,
    private emptyPipe: EmptyPipe,
    private userManagementApiService: UserManagementApiService,
    private dialog: MatDialog
  ) {}

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: address.userAddress) => element.id,
    },
    {
      columnDef: 'receiver-name',
      header: 'Receiver Name',
      cell: (element: address.userAddress) => element.receiverName,
    },
    {
      columnDef: 'receiver-phone',
      header: 'Receiver Phone Number',
      cell: (element: address.userAddress) =>
        `${element.receiverCountryCode} ${element.receiverPhoneNumber}`,
    },
    {
      columnDef: 'address-line-1',
      header: 'Address Line 1',
      cell: (element: address.userAddress) => element.addressLineOne,
    },
    {
      columnDef: 'address-line-2',
      header: 'Address Line 2',
      cell: (element: address.userAddress) =>
        this.emptyPipe.transform(element.addressLineTwo),
    },
    {
      columnDef: 'postcode',
      header: 'Postcode',
      cell: (element: address.userAddress) => element.postcode,
    },
    {
      columnDef: 'city',
      header: 'City',
      cell: (element: address.userAddress) => element.city,
    },
    {
      columnDef: 'state',
      header: 'State',
      cell: (element: address.userAddress) => element.state.name,
    },
    {
      columnDef: 'country',
      header: 'Country',
      cell: (element: address.userAddress) => element.country,
    },
    {
      columnDef: 'is-default',
      header: 'Is Default',
      cell: (element: address.userAddress) => element.isDefault,
    },
    {
      columnDef: 'tag',
      header: 'Tag',
      cell: (element: address.userAddress) => element.tag,
    },
    {
      columnDef: 'created-at',
      header: 'Created At',
      cell: (element: address.userAddress) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  displayedColumnsWithActions = [...this.displayedColumns, 'actions'];

  ngOnInit(): void {
    this.userManagementApiService.getUserAddressList().subscribe(addresses => {
      this.addressList = addresses;
    });
  }

  openAddEditDialog(
    actionType: globalType.dialogActionType,
    data?: address.userAddress
  ) {
    this.dialog.open<AddEditAddressDialogComponent, address.addEditDialogData>(
      AddEditAddressDialogComponent,
      {
        data: {
          actionType,
          userId: this.userId,
          data,
        },
      }
    );
  }

  openDeleteDialog(data: address.userAddress) {
    this.dialog.open<DeleteAddressDialogComponent, address.deleteDialogData>(
      DeleteAddressDialogComponent,
      {
        data: {
          userId: this.userId,
          data,
        },
      }
    );
  }
}
