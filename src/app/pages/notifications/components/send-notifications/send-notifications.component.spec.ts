import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotificationsComponent } from './send-notifications.component';

describe('SendNotificationsComponent', () => {
  let component: SendNotificationsComponent;
  let fixture: ComponentFixture<SendNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
