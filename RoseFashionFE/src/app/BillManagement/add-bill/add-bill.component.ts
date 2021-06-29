import { Component, OnInit } from '@angular/core';
import { CartModel, BillModel, UserModel, MessageModel } from 'src/app/Shared/model';
import { CartService } from 'src/app/Shared/cart-service';
import { BillService } from 'src/app/Shared/bill-service';
import { UserService } from 'src/app/Shared/user-service';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/Shared/message-service';


@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  user: UserModel = new UserModel();
  mycart: CartModel[] = [];
  totalprice: number = 0;
  warning: boolean = false;

  constructor(private cartService: CartService,
    private billService: BillService,
    private userService: UserService,
    private messageService: MessageService,
    private location: Location) { }

  ngOnInit() {
    this.mycart = this.cartService.ViewProductInCart();
    this.user = this.userService.getCurrentUser();
    if (this.user.Role == 'guest') {
      this.user.FullName = '';
      this.user.Email = '';
    }
    this.CalTotalPrice();
  }

  CalTotalPrice() {
    this.totalprice = 0;
    var i = 0;
    while (i < this.mycart.length) {
      this.totalprice += this.mycart[i].SalePrice * this.mycart[i].Amount;
      i++;
    }
  }

  CheckDiscount(originalprice: number, saleprice: number) {
    if (originalprice > saleprice) return true;
    return false;
  }

  AddBill(name, phone, address, discountcode) {
    if (name == '' || phone == '' || address == '') {
      this.warning = true;
      return;
    }
    var items: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
    var cartid = localStorage.getItem('CartID');
    var billinfo: BillModel = {
      BillID: '',
      CartID: cartid,
      OrderDate: null,
      ReceiverName: name,
      ReceiverPhone: phone,
      DeliveryAddress: address,
      DiscountCode: discountcode,
      TotalPrice: this.totalprice
    };

    this.cartService.UpdateCartInDatabase(cartid, items);
    this.cartService.UpdateProductQuantity(items).toPromise()
      .then(() => {
        this.billService.AddBillForMember(billinfo)
          .toPromise().then(result => this.cartService.GetLastUsedCart(this.user.UserID).toPromise()
            .then(result => {
              localStorage.setItem('CartID', result);
              this.cartService.GetItemsInCart(result);
              var message: MessageModel = { Title: "Thông báo", Content: "Hóa đơn đã được lưu." };
              this.messageService.SendMessage(message);
            }))
          .catch(err => {
            console.log("Lưu hóa đơn thất bại");
            var message: MessageModel = { Title: "Thông báo", Content: "Đã có lỗi xảy ra. Vui lòng thử lại sau." };
            this.messageService.SendMessage(message);
          });
      }).catch(err => {
        console.log("Cập nhật số lượng thất bại");
        var message: MessageModel = { Title: "Thông báo", Content: "Đã có lỗi xảy ra. Vui lòng thử lại sau." };
        this.messageService.SendMessage(message);
      });
  }

  Back() {
    this.location.back();
  }
}
