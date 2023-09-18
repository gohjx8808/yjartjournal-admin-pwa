import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnStockComponent } from './yarn-stock.component';

describe('YarnStockComponent', () => {
  let component: YarnStockComponent;
  let fixture: ComponentFixture<YarnStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YarnStockComponent],
    });
    fixture = TestBed.createComponent(YarnStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
