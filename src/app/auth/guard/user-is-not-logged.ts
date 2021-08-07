import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {UserRole} from '../../model/user/user';

@Injectable()
export class UserIsNotLoggedGuard implements CanActivate{

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.user == null){
      return true;
    }
    return this.router.navigate(
      this.authService.user.userRole === UserRole.PATIENT ? ['pacjent-strona-główna'] : ['doktor-strona-główna']
    );
  }

}