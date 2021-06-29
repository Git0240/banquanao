import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/Shared/model';
import { CategoryService } from 'src/app/Shared/category-service';


@Component({
  selector: 'app-showcategory',
  templateUrl: './showcategory.component.html',
  styleUrls: ['./showcategory.component.css']
})
export class ShowcategoryComponent implements OnInit {
  category: CategoryModel[];
  a: object;
  pageconfig: any;
  constructor(private categoryService: CategoryService) {
    this.pageconfig = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  ngOnInit() {
    this.getCategory();
  }
  //get category
  async getCategory() {
    await this.categoryService.GetAllCategory().toPromise().then(result => this.category = result);
  }

  pageChanged(event) {
    this.pageconfig.currentPage = event;
  }
}
