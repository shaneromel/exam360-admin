import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAlertComponent } from './stock-alert.component';

describe('StockAlertComponent', () => {
  let component: StockAlertComponent;
  let fixture: ComponentFixture<StockAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
