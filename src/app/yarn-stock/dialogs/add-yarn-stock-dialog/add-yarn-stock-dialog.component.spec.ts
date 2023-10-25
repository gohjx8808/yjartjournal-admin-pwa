import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYarnStockDialogComponent } from './add-yarn-stock-dialog.component';

describe('AddYarnStockDialogComponent', () => {
  let component: AddYarnStockDialogComponent;
  let fixture: ComponentFixture<AddYarnStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddYarnStockDialogComponent],
    });
    fixture = TestBed.createComponent(AddYarnStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
