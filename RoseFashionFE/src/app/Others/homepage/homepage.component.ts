import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/Shared/model';
import { ProductService } from 'src/app/Shared/product-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  productlist: ProductModel[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetTopSales().toPromise().then(result => this.productlist = result);
  }

}
