import { Component, Inject, OnInit } from '@angular/core';
import { UserManagementApiService } from '../../../../../api/user-management-api.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-add-edit-address-dialog',
  templateUrl: './add-edit-address-dialog.component.html',
  styleUrls: ['./add-edit-address-dialog.component.scss'],
})
export class AddEditAddressDialogComponent implements OnInit {
  isSubmitting = false;
  formOptions: address.addressFormOptions = { states: [], tags: [] };

  addEditAddressForm = this.formBuilder.group({
    receiverName: [this.dialogData.data?.receiverName, [Validators.required]],
    receiverCountryCode: [
      this.dialogData.data?.receiverCountryCode,
      [Validators.required],
    ],
    receiverPhoneNumber: [
      this.dialogData.data?.receiverPhoneNumber,
      [Validators.required],
    ],
    addressLineOne: [
      this.dialogData.data?.addressLineOne,
      [Validators.required],
    ],
    addressLineTwo: [this.dialogData.data?.addressLineTwo],
    postcode: [this.dialogData.data?.postcode, [Validators.required]],
    city: [this.dialogData.data?.city, [Validators.required]],
    state: [0, [Validators.required]],
    country: ['Malaysia', [Validators.required]],
    isDefault: [
      this.dialogData.data?.isDefault || false,
      [Validators.required],
    ],
    tag: [[this.dialogData.data?.tag]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: address.addEditDialogData,
    private userManagementApiService: UserManagementApiService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
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
    console.log(this.addEditAddressForm.value);
  }

  onTagChange(event: MatButtonToggleChange) {
    const toggle = event.source;
    if (toggle && event.value.some((item: never) => item == toggle.value)) {
      toggle.buttonToggleGroup.value = [toggle.value];
      this.addEditAddressForm.patchValue({ tag: [toggle.value] });
    }
  }
}
