import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteYarnStockDialogComponent } from './delete-yarn-stock-dialog.component';

describe('DeleteYarnStockDialogComponent', () => {
  let component: DeleteYarnStockDialogComponent;
  let fixture: ComponentFixture<DeleteYarnStockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteYarnStockDialogComponent],
    });
    fixture = TestBed.createComponent(DeleteYarnStockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
