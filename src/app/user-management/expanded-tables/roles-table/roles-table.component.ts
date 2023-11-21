import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRoleDialogComponent } from './dialogs/delete-role-dialog/delete-role-dialog.component';
import { AddRoleDialogComponent } from './dialogs/add-role-dialog/add-role-dialog.component';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent {
  @Input() roles: users.userRole[] = [];
  @Input() userId!: number;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Input() onRefreshData: () => void = () => {};

  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

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

  columnsWithActions = [...this.displayedColumns, 'actions'];

  openAddDialog = () => {
    this.dialog.open<AddRoleDialogComponent, users.addRoleDialogData>(
      AddRoleDialogComponent,
      {
        data: {
          userId: this.userId,
          onRefreshData: this.onRefreshData,
        },
      }
    );
  };

  openDeleteDialog = (data: users.userRole) => {
    this.dialog.open<DeleteRoleDialogComponent, users.deleteRoleDialogData>(
      DeleteRoleDialogComponent,
      {
        data: {
          data,
          onRefreshData: this.onRefreshData,
        },
      }
    );
  };
}
