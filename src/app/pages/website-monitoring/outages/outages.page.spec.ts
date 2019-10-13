import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutagesPage } from './outages.page';

describe('OutagesPage', () => {
  let component: OutagesPage;
  let fixture: ComponentFixture<OutagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
