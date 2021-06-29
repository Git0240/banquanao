import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillForAdminComponent } from './view-bill-for-admin.component';

describe('ViewBillForAdminComponent', () => {
  let component: ViewBillForAdminComponent;
  let fixture: ComponentFixture<ViewBillForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
