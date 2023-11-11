import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EmptyPipe } from 'src/app/pipes/empty.pipe';

@Component({
  selector: 'app-addresses-table',
  templateUrl: './addresses-table.component.html',
  styleUrls: ['./addresses-table.component.scss'],
})
export class AddressesTableComponent {
  @Input() addresses: users.userAddress[] = [];

  constructor(
    private datePipe: DatePipe,
    private emptyPipe: EmptyPipe
  ) {}

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: users.userAddress) => element.id,
    },
    {
      columnDef: 'receiverName',
      header: 'Receiver Name',
      cell: (element: users.userAddress) => element.receiverName,
    },
    {
      columnDef: 'receiverPhone',
      header: 'Receiver Phone Number',
      cell: (element: users.userAddress) =>
        `${element.receiverCountryCode} ${element.receiverPhoneNumber}`,
    },
    {
      columnDef: 'addressLineOne',
      header: 'Address Line 1',
      cell: (element: users.userAddress) => element.addressLineOne,
    },
    {
      columnDef: 'addressLineTwo',
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
}
