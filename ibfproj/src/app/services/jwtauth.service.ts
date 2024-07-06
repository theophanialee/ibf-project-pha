// jwtauth.service.ts

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../states/auth/auth.actions';
import { Observable } from 'rxjs';
import { AppState } from '../models';

@Injectable({
  providedIn: 'root',
})
export class JwtauthService {
  private tokenKey = 'kitchenkakisJWT';

  constructor(
    private cookieService: CookieService,
    private store: Store<AppState> // Inject NgRx Store
  ) {
    // Check if token exists in cookie on service initialization
    const isAuthenticated = this.getToken() !== '';
    this.store.dispatch(
      AuthActions.login({ token: isAuthenticated ? this.getToken()! : '' })
    );
  }

  // Save JWT token to cookie and update state
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 1, path: '/' });
    this.store.dispatch(AuthActions.login({ token }));
  }

  // Retrieve JWT token from cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove JWT token from cookie and update state
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.store.dispatch(AuthActions.logout());
  }

  // Check if user is authenticated (token present and valid)
  isAuthenticated(): Observable<boolean> {
    return this.store.select((state) => state.auth.isAuthenticated);
  }
}
