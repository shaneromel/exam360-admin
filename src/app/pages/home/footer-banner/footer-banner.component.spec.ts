import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBannerComponent } from './footer-banner.component';

describe('FooterBannerComponent', () => {
  let component: FooterBannerComponent;
  let fixture: ComponentFixture<FooterBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
