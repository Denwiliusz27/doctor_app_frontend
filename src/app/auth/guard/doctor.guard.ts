import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../auth.service';
import {Observable} from 'rxjs';
import {UserRole} from '../../model/user/user';

@Injectable()
export class DoctorGuard implements CanActivate{

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user?.userRole === UserRole.DOCTOR ? true : this.router.navigate(['']);
  }
}
