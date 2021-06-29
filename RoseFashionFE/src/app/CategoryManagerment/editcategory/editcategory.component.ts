import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/Shared/model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
//Validator
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { CategoryService } from 'src/app/Shared/category-service';
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  category: CategoryModel;
  Categories: CategoryModel[];
 idd: string;
  constructor(private categoryService: CategoryService,  private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCoursefromRoute();
  }

  getCoursefromRoute(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.categoryService.GetCategoryID(id).subscribe(category => this.category = category);
  }
  save(): void {
      this.categoryService.EditCategory(this.category).subscribe(() => this.goBack());
      alert("Congratulation! Added class successfully.")
    }
  goBack(): void {
      this.location.back();
    }
  
}
