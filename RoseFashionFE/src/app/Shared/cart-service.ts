import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CartModel } from './model';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  export class CartService{
    constructor(private http: HttpClient){}
    private carturl = 'http://localhost:62098/api/cart';

    AddToLocalCart(productid: string, image: string, name: string, size: string, amount: number, quantity: number, price: number, originalprice: number){
        const newitem: CartModel = {
            CartID: '', 
            UserID: '', 
            ProductID: productid, 
            Image: image, 
            Name: name, 
            Size: size, 
            Amount: amount,
            Quantity: quantity,
            SalePrice: price,
            OriginalPrice: originalprice
        };
        var mycart: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
        if(mycart){
            var i=0;
            while(i<mycart.length) {
                if(mycart[i].ProductID==newitem.ProductID && mycart[i].Size==newitem.Size) break;
                else i++;
            }
            if(i>=mycart.length){
                mycart.push(newitem);
            }
            else{
                var newamount = +mycart[i].Amount + +newitem.Amount;
                mycart[i].Amount = newamount;
            }
            localStorage.setItem('MyCart', JSON.stringify(mycart));
        }
        else{
            mycart = [];
            mycart.push(newitem);
            localStorage.setItem('MyCart', JSON.stringify(mycart));
        }
    }

    ViewProductInCart(){
        return JSON.parse(localStorage.getItem('MyCart'));
    }

    UpdateCartInDatabase(cartid: string, items: CartModel[]){
        const editedurl = `${this.carturl}?cartid=${cartid}`;
        return this.http.put(editedurl, items, httpOptions);
    }

    UpdateProductQuantity(items: CartModel[]){
        return this.http.put(this.carturl, items, httpOptions);
    }

    UpdateItemAmount(productid, amount){
        var mycart: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
        var updateditem = mycart.find(item => item.ProductID == productid);
        updateditem.Amount = amount;
        localStorage.setItem('MyCart', JSON.stringify(mycart));
    }

    DeleteItem(productid){
        var mycart: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
        const index = mycart.indexOf(mycart.find(item => item.ProductID == productid));
        mycart.splice(index, 1);
        localStorage.setItem('MyCart', JSON.stringify(mycart));
    }

    GetLastUsedCart(userid: string){
        const editedurl = `${this.carturl}?userid=${userid}`;
        return this.http.get<string>(editedurl);
    }

    GetItemsInCart(cartid: string){
        const editedurl = `${this.carturl}?cartid=${cartid}`;
        this.http.get(editedurl).toPromise()
        .then(result => localStorage.setItem('MyCart', JSON.stringify(result)));
    }

    GetCartLenght(){
        var mycart: CartModel[] = JSON.parse(localStorage.getItem('MyCart'));
        if(mycart) return mycart.length;
        else return 0;
    }

    SaveCartForGuestPayment(items: CartModel[], guestid: string): Observable<string>{
        const editedurl = `${this.carturl}?guestid=${guestid}`;
        return this.http.post<string>(editedurl, items, httpOptions);
    }

    GetItemsInBill(cartid: string): Observable<CartModel[]>{
        const editedurl = `${this.carturl}?cartid=${cartid}`;
        return this.http.get<CartModel[]>(editedurl);
    }
}