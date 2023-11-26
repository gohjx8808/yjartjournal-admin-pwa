import { Component, Inject, OnInit } from '@angular/core';
import { UserManagementApiService } from '../../../../../api/user-management-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-edit-address-dialog',
  templateUrl: './add-edit-address-dialog.component.html',
  styleUrls: ['./add-edit-address-dialog.component.scss'],
})
export class AddEditAddressDialogComponent implements OnInit {
  isSubmitting = false;
  formOptions: address.addressFormOptions = { states: [], tags: [] };

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: address.addEditDialogData,
    private userManagementApiService: UserManagementApiService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.userManagementApiService.getAddressFormOptions().subscribe(options => {
      this.formOptions = options.data;
    });
  }
}
