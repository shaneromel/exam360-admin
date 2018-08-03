import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePinsComponent } from './manage-pins.component';

describe('ManagePinsComponent', () => {
  let component: ManagePinsComponent;
  let fixture: ComponentFixture<ManagePinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
