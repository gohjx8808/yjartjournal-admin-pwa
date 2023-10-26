import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditYarnStockDialogComponent } from './add-edit-yarn-stock-dialog.component';

describe('AddEditYarnStockDialogComponent', () => {
  let component: AddEditYarnStockDialogComponent;
  let fixture: ComponentFixture<AddEditYarnStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditYarnStockDialogComponent],
    });
    fixture = TestBed.createComponent(AddEditYarnStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
