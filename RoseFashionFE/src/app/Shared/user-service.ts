import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './model';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

export class UserService {

    constructor(private http: HttpClient) {
    }

    private userurl = 'http://localhost:62098/api/user';

    Register(newuser: UserModel): Observable<any> {
        return this.http.post(this.userurl, newuser);
    }

    login(Email: string, Password: string): Observable<UserModel> {
        const editedurl = `${this.userurl}/login`;
        const account: UserModel = { Email, Password } as UserModel;
        return this.http.post<UserModel>(editedurl, account, httpOptions)
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('CartID');
        localStorage.removeItem('MyCart');
    }

    getCurrentUser() {
        var user: UserModel = JSON.parse(localStorage.getItem('currentUser'));
        if (user == null) {
            user = JSON.parse(localStorage.getItem('currentGuest'));
        }
        return user;
    }

    //get account by email
    GetAccountByID(id: string): Observable<UserModel> {
        const geturl = `${this.userurl}?id=${id}`;
        return this.http.get<UserModel>(geturl);
    }
    //update account
    UpdateAccount(editedaccount: UserModel): Observable<any> {
        return this.http.put(this.userurl, editedaccount, httpOptions);
    }


    CreateGuestID(): Observable<any> {
        const editedurl = `${this.userurl}/guest`;
        return this.http.get<any>(editedurl);
    }

}