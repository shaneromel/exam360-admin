import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrivacyPolicyComponent } from './update-privacy-policy.component';

describe('UpdatePrivacyPolicyComponent', () => {
  let component: UpdatePrivacyPolicyComponent;
  let fixture: ComponentFixture<UpdatePrivacyPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePrivacyPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
