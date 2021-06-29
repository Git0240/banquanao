import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillForCustomerComponent } from './view-bill-for-customer.component';

describe('ViewBillForCustomerComponent', () => {
  let component: ViewBillForCustomerComponent;
  let fixture: ComponentFixture<ViewBillForCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillForCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
