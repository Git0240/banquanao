import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoryModel } from './model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

export class CategoryService {
    constructor(private http: HttpClient) { }
    private categoryurl = 'http://localhost:62098/api/category';

    GetCategorybyMainCategory(id: string): Observable<CategoryModel[]> {
        const editedurl = `${this.categoryurl}?maincategory=${id}`;
        return this.http.get<CategoryModel[]>(editedurl);
    }

    GetAllCategory(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.categoryurl);
    }

    AddCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.categoryurl, category)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {

        return throwError('Error...Please try again!');

    }

    EditCategory(categories: CategoryModel): Observable<any> {
        return this.http.put<CategoryModel>(this.categoryurl, categories, httpOptions).pipe();
    }

    GetCategoryID(id: string): Observable<CategoryModel> {
        const url = `${this.categoryurl}?categoryId=${id}`;
        return this.http.get<CategoryModel>(url).pipe();
    }

}