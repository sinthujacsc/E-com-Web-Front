import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterV1Component } from './footer-v1.component';

describe('FooterV1Component', () => {
  let component: FooterV1Component;
  let fixture: ComponentFixture<FooterV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
