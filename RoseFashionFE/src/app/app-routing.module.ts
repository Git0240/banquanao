import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProductComponent } from './ProductManagement/add-update-product/add-product.component';


import { EditcategoryComponent } from './CategoryManagerment/editcategory/editcategory.component';
import { ShowcategoryComponent } from './CategoryManagerment/showcategory/showcategory.component'
import { ViewCartComponent } from './CartManagement/view-cart/view-cart.component';
import { ViewProductListForCustomerComponent } from './ProductManagement/view-product-list-for-customer/view-product-list-for-customer.component';
import { AddBillComponent } from './BillManagement/add-bill/add-bill.component';
import { ViewProductListComponent } from './ProductManagement/view-product-list/view-product-list.component';
import { AddProductToCartComponent } from './ProductManagement/add-product-to-cart/add-product-to-cart.component';
import { HomepageComponent } from './Others/homepage/homepage.component';
import {AddcategoryComponent} from './CategoryManagerment/addcategory/addcategory.component';

import { CreateAccountComponent } from './AccountManagerment/create-account/create-account.component';
import { AuthGuard } from './Shared/auth-guard';
import { EditAccountComponent } from './AccountManagerment/edit-account/edit-account.component';
import { ViewBillDetailComponent } from './BillManagement/view-bill-detail/view-bill-detail.component';
import { ViewBillForCustomerComponent } from './BillManagement/view-bill-for-customer/view-bill-for-customer.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path:'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path:'view-product-list', component: ViewProductListComponent, canActivate: [AuthGuard]},
  {path:'update-product/:productid', component: AddProductComponent, canActivate: [AuthGuard]},
  {path:'add-product-to-cart/:productid', component: AddProductToCartComponent},

  {path:'editcategory/:id', component: EditcategoryComponent, canActivate: [AuthGuard]},
  {path:'showcategory', component: ShowcategoryComponent, canActivate: [AuthGuard]},
  {path:'addcategory', component: AddcategoryComponent, canActivate: [AuthGuard]},

  {path: 'view-cart', component: ViewCartComponent},
  {path: 'view-product-list-for-customer', component: ViewProductListForCustomerComponent},
  {path: 'add-bill', component: AddBillComponent},
  {path: 'register', component: CreateAccountComponent},
  {path: 'edit-account',component:EditAccountComponent},
  {path: 'purchase-history', component: ViewBillForCustomerComponent},
  {path: 'findproduct/:keyword', component:ViewProductListForCustomerComponent},
  {path: 'viewbilldetail/:billid', component: ViewBillDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
