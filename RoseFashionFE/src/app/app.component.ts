import { Component, HostListener } from '@angular/core';
import { UserModel, CartModel, KeyWord, MessageModel } from 'src/app/Shared/model';
import { UserService } from './Shared/user-service';
import { CartService } from './Shared/cart-service';
import { MessageService } from './Shared/message-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loginmessage: string;
  currentUser: UserModel = new UserModel();
  returnUrl: string;

  email: string;
  islogon: boolean;
  showMessage: string;
  role: string;
  text: string;
  itemsincart: number = 0;

  showbutton: boolean = false;
  minscrollposition: number = 100;

  keyword: string = '';

  logopath = 'assets/images/logo1.png';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    var cartid = localStorage.getItem('CartID');
    var items: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
    if (cartid) {
      this.cartService.UpdateCartInDatabase(cartid, items)
        .toPromise().then(result => console.log(result))
        .catch(err => console.log(err));
    }
  }

  @HostListener('window:scroll')
  CheckScroll() {
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition >= this.minscrollposition) {
      this.showbutton = true;
    } else {
      this.showbutton = false;
    }
  }

  constructor(
    private userservice: UserService,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  Find() {
    this.messageService.SendKeyword(this.keyword);
  }

  BackToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  UpdateCartQuantity() {
    return this.cartService.GetCartLenght();
  }

  getCurrentUser() {
    var temp = this.userservice.getCurrentUser();
    if (temp) {
      this.currentUser = temp;
      if (this.currentUser.Role == 'guest') this.islogon = false;
      else {
        this.islogon = true;
      }
      this.cartService.GetLastUsedCart(this.currentUser.UserID).toPromise()
      .then(result => {
        localStorage.setItem('CartID', result);
        this.cartService.GetItemsInCart(result);
      });
    }
    else {
      this.islogon = false;
      this.userservice.CreateGuestID().toPromise()
        .then(id => {
          this.userservice.GetAccountByID(id)
            .toPromise().then(result => {
              localStorage.setItem('currentGuest', JSON.stringify(result));
              this.currentUser = result;
            });
          this.cartService.GetLastUsedCart(id).toPromise()
            .then(result => {
              localStorage.setItem('CartID', result);
              this.cartService.GetItemsInCart(result);
            })
        });
    }
    
    // if (temp) {
    //   this.currentUser = temp;
    //   if(this.currentUser.Role!='guest'){
    //     this.islogon = true;
    //     this.cartService.GetLastUsedCart(this.currentUser.UserID).toPromise()
    //     .then(result => 
    //       {
    //         localStorage.setItem('CartID', result);
    //         this.cartService.GetItemsInCart(result);
    //       });
    //   }
    //   else this.islogon = false;
    // }
    // else {
    //   this.islogon = false;
    //   this.userservice.CreateGuestID().toPromise()
    //     .then(email => {
    //       this.userservice.GetAccountByEmail(email)
    //       .toPromise().then(result => {
    //         localStorage.setItem('currentGuest', JSON.stringify(result));
    //         this.currentUser = result;
    //       })
    //     });
    // }
  }

  ResetSearchbar() {
    this.keyword = '';
  }

  async login(email: string, password: string) {

    this.loginmessage = null;

    this.currentUser = await this.userservice.login(email, password).toPromise().then(data => this.currentUser = data, error => this.loginmessage = error);
    if (this.loginmessage != null) {
      var msg: MessageModel = { Title: 'Thông báo', Content: 'Tài khoản hoặc mật khẩu không chính xác.' };
      this.messageService.SendMessage(msg);
    } else {
      var msg: MessageModel = { Title: 'Thông báo', Content: 'Đăng nhập thành công.' };
      this.messageService.SendMessage(msg);
      this.router.navigate(['/home']);
    }
    this.getCurrentUser();
  }

  logout() {
    this.userservice.logout();
    this.getCurrentUser();
  }
}