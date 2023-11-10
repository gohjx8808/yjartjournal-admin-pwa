import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent {
  @Input() roles: users.userRole[] = [];

  constructor(private datePipe: DatePipe) {}

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: users.userRole) => element.id,
    },
    {
      columnDef: 'roleName',
      header: 'Role',
      cell: (element: users.userRole) => element.role.name,
    },
    {
      columnDef: 'createdAt',
      header: 'Created At',
      cell: (element: users.userRole) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
}
