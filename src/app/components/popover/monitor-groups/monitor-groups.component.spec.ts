import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorGroupsComponent } from './monitor-groups.component';

describe('MonitorGroupsComponent', () => {
  let component: MonitorGroupsComponent;
  let fixture: ComponentFixture<MonitorGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
