import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../../../../../services/snackbar.service';
import { UserManagementApiService } from '../../../../../api/user-management-api.service';

@Component({
  selector: 'app-add-edit-address-dialog',
  templateUrl: './add-edit-address-dialog.component.html',
  styleUrls: ['./add-edit-address-dialog.component.scss'],
})
export class AddEditAddressDialogComponent implements OnInit {
  isSubmitting = false;
  formOptions: address.addressFormOptions = { states: [], tags: [] };

  addEditAddressForm = this.formBuilder.group({
    receiverName: ['', [Validators.required]],
    receiverCountryCode: ['', [Validators.required]],
    receiverPhoneNumber: ['', [Validators.required]],
    addressLineOne: ['', [Validators.required]],
    addressLineTwo: [undefined as unknown as string],
    postcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: [0, [Validators.required]],
    country: ['Malaysia', [Validators.required]],
    isDefault: [false, [Validators.required]],
    tag: [['']],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: address.addEditDialogData,
    private userManagementApiService: UserManagementApiService,
    private formBuilder: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<AddEditAddressDialogComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    if (this.dialogData.data) {
      this.addEditAddressForm.patchValue({
        receiverName: this.dialogData.data.receiverName,
        receiverCountryCode: this.dialogData.data.receiverCountryCode,
        receiverPhoneNumber: this.dialogData.data.receiverPhoneNumber,
        addressLineOne: this.dialogData.data.addressLineOne,
        addressLineTwo: this.dialogData.data.addressLineTwo,
        postcode: this.dialogData.data.postcode,
        city: this.dialogData.data.city,
        isDefault: this.dialogData.data.isDefault,
        tag: [this.dialogData.data.tag],
      });
    }
    this.userManagementApiService.getAddressFormOptions().subscribe(options => {
      this.formOptions = options.data;
      this.addEditAddressForm.patchValue({
        state: options.data.states.find(
          state => state.name === this.dialogData.data?.state.name
        )?.id,
      });
    });
  }

  onSubmit() {
    if (!this.addEditAddressForm.valid) {
      this.addEditAddressForm.markAllAsTouched;
    } else {
      const formData = this.addEditAddressForm.getRawValue();
      this.dialogRef.disableClose = true;
      let addressActionResponse: Observable<unknown> = new Observable();
      if (this.dialogData.actionType === 'Add') {
        addressActionResponse = this.userManagementApiService.submitAddAddress({
          ...formData,
          // NOTE: state name is not required here
          state: { id: formData.state, name: 'dummy state' },
          tag: formData.tag[0],
          userId: this.dialogData.userId,
        });
      } else {
        if (this.dialogData.data) {
          addressActionResponse =
            this.userManagementApiService.submitUpdateAddress({
              ...formData,
              // NOTE: state name is not required here
              state: { id: formData.state, name: 'dummy state' },
              tag: formData.tag[0],
              userId: this.dialogData.userId,
              addressId: this.dialogData.data.id,
            });
        }
      }

      addressActionResponse.subscribe({
        next: () => {
          this.dialogRef.disableClose = false;
          this.dialogRef.close();
          this.userManagementApiService.getUserAddressApi({
            userId: this.dialogData.userId,
          });
          this.isSubmitting = false;
          this.snackbarService.openSuccessSnackbar(
            `The address had been ${
              this.dialogData.actionType === 'Add' ? 'added' : 'updated'
            }!`
          );
        },
        error: (err: HttpErrorResponse) => {
          this.dialogRef.disableClose = false;
          this.isSubmitting = false;
          let errorMsg =
            err.statusText ||
            `The address had failed to ${
              this.dialogData.actionType === 'Add' ? 'add' : 'update'
            }!`;
          if (err.status === 422) {
            errorMsg = err.error?.message || err.error.errors?.[0].msg;
          }
          this.snackbarService.openErrorSnackbar(errorMsg);
        },
      });
    }
  }

  onTagChange(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle && event.value.some((item: never) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [toggle.value];
      this.addEditAddressForm.patchValue({ tag: [toggle.value] });
    }
  }
}
