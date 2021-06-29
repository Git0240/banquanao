import { Component, OnInit } from '@angular/core';

import { CategoryModel } from 'src/app/Shared/model';
//Validator
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Shared/category-service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  classForm: FormGroup; //Validator
  public category :CategoryModel[] ;
  public showMessage ;
  vaCate = { name: '', maincategory: ''};

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    //Validators
    this.classForm = new FormGroup({
      'name': new FormControl(this.vaCate.name, [
        Validators.required

      ]),
      'maincategory': new FormControl(this.vaCate.maincategory, [
        Validators.required
      ]),
     
  })
  }

 // Validators
get name() { return this.classForm.get('name'); }
get maincategory() { return this.classForm.get('maincategory'); }


//add new category
addCategory(Name: string, MainCategory: string): void{
var addCategory: CategoryModel;
this.showMessage=null;
addCategory = {Name,MainCategory} as CategoryModel
this.categoryService.AddCategory(addCategory).subscribe(addCourse => this.category.push(addCourse), 
                                                  error => this.showMessage = error);
}

}
