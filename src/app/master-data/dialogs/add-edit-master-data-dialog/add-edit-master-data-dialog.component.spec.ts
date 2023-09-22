import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMasterDataDialogComponent } from './add-edit-master-data-dialog.component';

describe('AddEditMasterDataDialogComponent', () => {
  let component: AddEditMasterDataDialogComponent;
  let fixture: ComponentFixture<AddEditMasterDataDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMasterDataDialogComponent],
    });
    fixture = TestBed.createComponent(AddEditMasterDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
