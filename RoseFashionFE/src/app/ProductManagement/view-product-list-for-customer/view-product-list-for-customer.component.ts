import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ProductModel, CategoryModel, KeyWord } from 'src/app/Shared/model';
import { ProductService } from 'src/app/Shared/product-service';
import { CategoryService } from 'src/app/Shared/category-service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-product-list-for-customer',
  templateUrl: './view-product-list-for-customer.component.html',
  styleUrls: ['./view-product-list-for-customer.component.css']
})
export class ViewProductListForCustomerComponent implements OnInit {

  productlist: ProductModel[] = [];
  categorylist: CategoryModel[] = [];
  pageconfig: any;

  keyword: string;

  selectedcategory: string = 'all';

  static searchkeyword: string = '';

  showsidebar: boolean = false;

  static searchbtn: HTMLElement;

  constructor(private productService: ProductService,
    private categoryService: CategoryService, private route: ActivatedRoute) {
    this.pageconfig = {
      itemsPerPage: 10,
      currentPage: 1
    };
    this.keyword = ViewProductListForCustomerComponent.searchkeyword;
    ViewProductListForCustomerComponent.searchbtn = document.getElementById('searchbtn') as HTMLElement;
  }


  ngOnInit() {
    ViewProductListForCustomerComponent.searchbtn = document.getElementById('searchbtn') as HTMLElement;
    //this.GetProductList();
    this.FindProduct();
    this.GetAllCategory();
  }

  ngOnDestroy() {
    ViewProductListForCustomerComponent.searchkeyword = undefined;
  }

  ToggleSidebar() {
    this.showsidebar = !this.showsidebar;
  }

  pageChanged(event) {
    this.pageconfig.currentPage = event;
  }

  async GetAllCategory() {
    await this.categoryService.GetAllCategory().toPromise().then(result => this.categorylist = result);
  }

  async GetProductList() {
    await this.productService.GetAllProduct().toPromise().then(result => this.productlist = result);
  }
  // find product
  async FindProduct() {
    this.keyword = ViewProductListForCustomerComponent.searchkeyword;
    if (this.keyword) {
      /*if (this.keyword.trim() == '') {
        this.GetProductList();
        this.selectedcategory = 'all';
      }
      else {*/
        await this.productService.FindProduct(this.keyword).toPromise()
          .then(result => this.productlist = result)
          .catch(err => this.productlist = []);
        this.selectedcategory = '';
      //}
    }
    else {
      this.GetProductList();
      this.selectedcategory = 'all';
    }
  }

  async GetProductByCategory(categoryid) {
    await this.productService.GetProductByCategory(categoryid).toPromise().then(result => this.productlist = result);
  }

  async onSelectCategory(categoryid) {
    this.keyword = undefined;
    this.selectedcategory = categoryid;
    if (categoryid == 'all') await this.GetProductList();
    else await this.GetProductByCategory(categoryid);
    this.pageconfig.currentPage = 1;
  }

  GetColor(categoryid) {
    if (categoryid == this.selectedcategory) return 'white';
    else return '';
  }

}
