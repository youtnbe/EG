import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Injectable, Component} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {AuthService} from './../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/adminauth']);
            return false;
        }
    }
}
