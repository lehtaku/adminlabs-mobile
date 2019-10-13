import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsPage } from './monitors.page';

describe('MonitorsPage', () => {
  let component: MonitorsPage;
  let fixture: ComponentFixture<MonitorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
