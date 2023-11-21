import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRoleDialogComponent } from './delete-role-dialog.component';

describe('DeleteRoleDialogComponent', () => {
  let component: DeleteRoleDialogComponent;
  let fixture: ComponentFixture<DeleteRoleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRoleDialogComponent],
    });
    fixture = TestBed.createComponent(DeleteRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
