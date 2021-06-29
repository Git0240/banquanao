import { Component, OnInit } from '@angular/core';
import { ProductModel, CategoryModel, MessageModel } from 'src/app/Shared/model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { max } from 'rxjs/operators';
import { CartService } from 'src/app/Shared/cart-service';
import { UserService } from 'src/app/Shared/user-service';
import { MessageService } from 'src/app/Shared/message-service';
import { ProductService } from 'src/app/Shared/product-service';

@Component({
  selector: 'app-add-product-to-cart',
  templateUrl: './add-product-to-cart.component.html',
  styleUrls: ['./add-product-to-cart.component.css']
})
export class AddProductToCartComponent implements OnInit {

  product: ProductModel = new ProductModel();
  selectedsize: string;
  maxamount: number;
  inputamount: number = 1;
  warning: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0,0);
    var productid = this.route.snapshot.paramMap.get('productid');
    this.productService.GetProductDetail(productid).toPromise().then(p => this.product = p);
  }

  AddToCart(amount: number){
    if(!this.selectedsize) {
      this.warning = true;
      return;
    }
    this.cartService.AddToLocalCart(this.product.ProductID, this.product.Image, this.product.Name, this.selectedsize, amount, this.maxamount, (this.product.Price-this.product.Price*this.product.DiscountPercent/100), this.product.Price);
    var msg: MessageModel = {Title:"Thông báo", Content: "Đã thêm sản phẩm vào giỏ hàng."};
    this.messageService.SendMessage(msg);
  }

  OnSizeChange(size, index: number){
    this.selectedsize = size;
    this.maxamount = this.product.Quantity[index];
    this.inputamount = 1;
    this.warning = false;
  }

  OnAmountChange(){
    if(this.inputamount>this.maxamount) this.inputamount = this.maxamount;
    if(this.inputamount<=0) this.inputamount = 1;
  }
}
