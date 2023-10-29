import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargedImageDialogComponent } from './enlarged-image-dialog.component';

describe('EnlargedImageDialogComponent', () => {
  let component: EnlargedImageDialogComponent;
  let fixture: ComponentFixture<EnlargedImageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnlargedImageDialogComponent],
    });
    fixture = TestBed.createComponent(EnlargedImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
