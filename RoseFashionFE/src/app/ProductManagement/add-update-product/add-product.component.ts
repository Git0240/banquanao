import { Component, OnInit } from '@angular/core';
import { CategoryModel, ProductModel, MessageModel } from 'src/app/Shared/model';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Shared/product-service';
import { CategoryService } from 'src/app/Shared/category-service';
import { MessageService } from 'src/app/Shared/message-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  message: any;
  product: ProductModel = new ProductModel();
  //{ ProductID: '', Name: '', Color: '#000000', Size: [] = ['S', 'M', 'L', 'XL', 'XXL'], CategoryID: '', Description: '', Quantity: [] = [0, 0, 0, 0, 0], Image: '', Price: 0, SoldOut: false };
  categorylist: CategoryModel[] = [];
  maxquantity: number = 999;
  minquantity: number = 0;
  minprice: number = 0;
  maincategory: string = '';
  categoryrequire: boolean;
  namerequire: boolean;
  addfunction: boolean = true;
  sizes = [
    { name: 'S', quantity: 0, checked: false },
    { name: 'M', quantity: 0, checked: false },
    { name: 'L', quantity: 0, checked: false },
    { name: 'XL', quantity: 0, checked: false },
    { name: 'XXL', quantity: 0, checked: false }
  ]

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.categoryService.GetAllCategory()
      .toPromise().then(result => {
        this.categorylist = result;
        var productid = this.route.snapshot.paramMap.get('productid');
        if(productid) {
          this.productService.GetProductDetail(productid).toPromise().then(p => {
            this.product = p;
            this.SetCategory();
          });
          this.addfunction = false;
        }
        else {
          this.SetMainCategory();
        }
      });
  }

  // đọc dữ liệu file ảnh sang dạng url
  //nguồn tham khảo https://stackblitz.com/edit/angular-file-upload-preview?file=app%2Fapp.component.html
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.product.Image = reader.result.toString();
      }
    }
    else {
      this.product.Image = '';
    }
  }

  Cancel() {
    if (confirm('Bạn có muốn hủy toàn bộ thay đổi đã thực hiện tại trang này không?')) {
      this.location.back();
    }
  }

  SetMainCategory() {
    var i = 0;
    while (i < this.categorylist.length) {
      if (this.categorylist[i].MainCategory == null) {
        this.maincategory = this.categorylist[i].CategoryID;
        break;
      }
      i++;
    }
  }

  OnQuantityChange(index: number) {
    if (this.product.Quantity[index] % 1 !== 0 || this.product.Quantity[index] == null) this.product.Quantity[index] = this.minquantity;
    if (this.product.Quantity[index] > this.maxquantity) this.product.Quantity[index] = this.maxquantity;
    if (this.product.Quantity[index] <= this.minquantity) this.product.Quantity[index] = this.minquantity;

  }

  OnPriceChange() {
    if (this.product.Price % 1 !== 0 || this.product.Price == null) this.product.Price = this.minprice;
    if (this.product.Price < this.minprice) this.product.Price = this.minprice;
  }

  OnDiscountChange() {
    if (this.product.DiscountPercent % 1 !== 0 || this.product.DiscountPercent == null) this.product.DiscountPercent = 0;
    if (this.product.DiscountPercent > 100) this.product.DiscountPercent = 100;
    if (this.product.DiscountPercent < 0) this.product.DiscountPercent = 0;
  }

  CheckEmptyValue() {
    //kiem tra name
    if (this.product.Name == '') this.namerequire = true;
    else this.namerequire = false;
    //kiem tra category
    if (this.product.CategoryID == '') this.categoryrequire = true;
    else this.categoryrequire = false;
    if (!this.namerequire && !this.categoryrequire) return true;
    return false;
  }

  async AddProduct() {
    await this.productService.AddProduct(this.product)
      .toPromise().then(() => {
        alert('Thêm sản phẩm thành công');
        this.location.back();
      })
      .catch(() => alert('Đã có lỗi xảy ra.'));
  }

  async GetAllCategory() {
    await this.categoryService.GetAllCategory().toPromise().then(result => this.categorylist = result);
  }

  GetSelectedSizeAndQuantity() {
    this.product.Size = this.sizes.filter(opt => opt.checked).map(opt => opt.name);
    this.product.Quantity = this.sizes.filter(opt => opt.checked).map(opt => opt.quantity);
  }

  SetCategory() {
    var i: number = 0;
    for (i; i < this.categorylist.length; i++) {
      if (this.categorylist[i].CategoryID == this.product.CategoryID) {
        this.maincategory = this.categorylist[i].MainCategory; break;
      }
    }
  }

  UpdateProduct() {
    this.productService.UpdateProduct(this.product)
      .toPromise().then(() => {
        alert('Cập nhật sản phẩm thành công');
        this.location.back();
      })
      .catch(() => alert('Đã có lỗi xảy ra.'));
  }

  Save() {
    console.log(this.product);
    if (this.CheckEmptyValue() == false) return;
    if (this.product.Price == 0) {
      if (!confirm('Bạn đang lưu thông tin sản phẩm với giá là 0 VNĐ.\nBạn vẫn muốn tiếp tục?')) {
        return;
      }
    }
    if (this.addfunction == true) this.AddProduct();
    else this.UpdateProduct();
  }

}
