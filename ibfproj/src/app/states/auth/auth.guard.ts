import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtauthService } from '../../services/jwtauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private jwtService: JwtauthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.jwtService.getToken()) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
