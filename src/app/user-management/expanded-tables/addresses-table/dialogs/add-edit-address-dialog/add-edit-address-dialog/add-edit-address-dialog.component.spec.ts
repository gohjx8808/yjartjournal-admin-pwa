import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAddressDialogComponent } from './add-edit-address-dialog.component';

describe('AddEditAddressDialogComponent', () => {
  let component: AddEditAddressDialogComponent;
  let fixture: ComponentFixture<AddEditAddressDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAddressDialogComponent],
    });
    fixture = TestBed.createComponent(AddEditAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
