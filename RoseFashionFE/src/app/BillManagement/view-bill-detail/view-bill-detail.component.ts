import { Component, OnInit } from '@angular/core';
import { BillModel, CartModel } from 'src/app/Shared/model';
import { BillService } from 'src/app/Shared/bill-service';
import { CartService } from 'src/app/Shared/cart-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-bill-detail',
  templateUrl: './view-bill-detail.component.html',
  styleUrls: ['./view-bill-detail.component.css']
})
export class ViewBillDetailComponent implements OnInit {

  billinfo: BillModel = new BillModel();
  usedcart: CartModel[] = [];
  billid: string;
  constructor(private billService: BillService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.billid = this.route.snapshot.paramMap.get('billid');
    this.billService.GetOneBillInfo(this.billid).toPromise()
    .then(result => {
      this.billinfo = result;
      this.cartService.GetItemsInBill(this.billinfo.CartID).toPromise()
      .then(items => this.usedcart = items);
    });
  }

  CalDiscountPercent(saleprice, originalprice){
    return (originalprice - saleprice)*100/originalprice;
  }
}
