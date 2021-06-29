import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillDetailComponent } from './view-bill-detail.component';

describe('ViewBillDetailComponent', () => {
  let component: ViewBillDetailComponent;
  let fixture: ComponentFixture<ViewBillDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
