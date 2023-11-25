import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRoleDialogComponent } from './dialogs/delete-role-dialog/delete-role-dialog.component';
import { AddRoleDialogComponent } from './dialogs/add-role-dialog/add-role-dialog.component';
import { UserManagementApiService } from '../../api/user-management-api.service';

@Component({
  selector: 'app-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent implements OnInit {
  roles: role.userRole[] = [];
  @Input() userId!: number;

  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private userManagementApiService: UserManagementApiService
  ) {}

  ngOnInit(): void {
    this.userManagementApiService.getUserRoleList().subscribe(data => {
      this.roles = data;
    });
  }

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: role.userRole) => element.id,
    },
    {
      columnDef: 'roleName',
      header: 'Role',
      cell: (element: role.userRole) => element.role.name,
    },
    {
      columnDef: 'createdAt',
      header: 'Created At',
      cell: (element: role.userRole) =>
        this.datePipe.transform(element.createdAt, 'YYYY-MM-dd'),
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  columnsWithActions = [...this.displayedColumns, 'actions'];

  openAddDialog = () => {
    this.dialog.open<AddRoleDialogComponent, users.userIdPayload>(
      AddRoleDialogComponent,
      {
        data: {
          userId: this.userId,
        },
      }
    );
  };

  openDeleteDialog = (data: role.userRole) => {
    this.dialog.open<DeleteRoleDialogComponent, role.deleteRoleDialogData>(
      DeleteRoleDialogComponent,
      {
        data: {
          data,
          userId: this.userId,
        },
      }
    );
  };
}
