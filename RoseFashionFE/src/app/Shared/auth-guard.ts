import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { UserService } from './user-service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.userService.getCurrentUser();
        // tslint:disable-next-line: align
        if (currentUser) {
            // check if route is restricted by role
            // if (route.data.roles && route.data.roles.indexOf(currentUser.Role) === -1) {
            //     // role not authorised so redirect to home page
            //     this.router.navigate(['/home']);
            //     return false;
            // }
            if(currentUser.Role == 'guest' || currentUser.Role == 'user'){
                this.router.navigate(['/home']);
                return false;
            }

            // authorised so return true
            return true;
        }
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
