import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancesPage } from './maintenances.page';

describe('MaintenancesPage', () => {
  let component: MaintenancesPage;
  let fixture: ComponentFixture<MaintenancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
