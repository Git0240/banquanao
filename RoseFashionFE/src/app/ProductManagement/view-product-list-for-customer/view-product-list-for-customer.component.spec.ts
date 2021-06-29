import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductListForCustomerComponent } from './view-product-list-for-customer.component';

describe('ViewProductListForCustomerComponent', () => {
  let component: ViewProductListForCustomerComponent;
  let fixture: ComponentFixture<ViewProductListForCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductListForCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductListForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
