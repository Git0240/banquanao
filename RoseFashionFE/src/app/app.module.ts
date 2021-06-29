import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './ProductManagement/add-update-product/add-product.component';

//import { UserService, ProductService, CategoryService, CartService, BillService, MessageService } from './services';

import { AddcategoryComponent } from './CategoryManagerment/addcategory/addcategory.component';
import { EditcategoryComponent } from './CategoryManagerment/editcategory/editcategory.component';
import { ShowcategoryComponent } from './CategoryManagerment/showcategory/showcategory.component';

import { ViewProductListComponent } from './ProductManagement/view-product-list/view-product-list.component';
import { AddProductToCartComponent } from './ProductManagement/add-product-to-cart/add-product-to-cart.component';
import { ViewProductListForCustomerComponent } from './ProductManagement/view-product-list-for-customer/view-product-list-for-customer.component';

import { ViewCartComponent } from './CartManagement/view-cart/view-cart.component';
import { CreateAccountComponent } from './AccountManagerment/create-account/create-account.component';
import { EditAccountComponent } from './AccountManagerment/edit-account/edit-account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { NgxPaginationModule } from 'ngx-pagination';
import { AddBillComponent } from './BillManagement/add-bill/add-bill.component';
import { HomepageComponent } from './Others/homepage/homepage.component';
import { MessageModalComponent } from './Others/message-modal/message-modal.component';
import { AuthGuard } from './Shared/auth-guard';
import { UserService } from './Shared/user-service';
import { ProductService } from './Shared/product-service';
import { CategoryService } from './Shared/category-service';
import { CartService } from './Shared/cart-service';
import { BillService } from './Shared/bill-service';
import { MessageService } from './Shared/message-service';
import { KeyWord } from './Shared/model';
import { ViewBillDetailComponent } from './BillManagement/view-bill-detail/view-bill-detail.component';
import { ViewBillForCustomerComponent } from './BillManagement/view-bill-for-customer/view-bill-for-customer.component';
import { ViewBillForAdminComponent } from './BillManagement/view-bill-for-admin/view-bill-for-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ShowcategoryComponent,
    ViewProductListComponent,
    AddProductToCartComponent,
    ViewProductListForCustomerComponent,
    ViewCartComponent,
    CreateAccountComponent,
    EditAccountComponent,
    AddBillComponent,
    HomepageComponent,
    MessageModalComponent,
    ViewBillDetailComponent,
    ViewBillForCustomerComponent,
    ViewBillForAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  
  ],

  providers: [
    UserService, 
    ProductService, 
    CategoryService,
    CartService,
    BillService,
    MessageService,
    AuthGuard,
    KeyWord
  ],



  bootstrap: [AppComponent]
})
export class AppModule { }
