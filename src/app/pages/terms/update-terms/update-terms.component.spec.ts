import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTermsComponent } from './update-terms.component';

describe('UpdateTermsComponent', () => {
  let component: UpdateTermsComponent;
  let fixture: ComponentFixture<UpdateTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
