import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn       // {1}
      .take(1)                               // {2}
      .map((isLoggedIn: boolean) => {        // {3}
        if (!isLoggedIn) {
          this.router.navigate(['/login']);  // {4}
          return false;
        }
        return true;
      });


  }
}
