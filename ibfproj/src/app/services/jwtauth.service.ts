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
  private userIdKey = 'userId';

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
  saveToken(token: string, userId: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 1, path: '/' });
    localStorage.setItem(this.userIdKey, userId);
    console.log('User ID saved:', userId);
    this.store.dispatch(AuthActions.login({ token }));
  }

  // Retrieve JWT token from cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove JWT token from cookie and update state
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    localStorage.removeItem(this.userIdKey);
    this.store.dispatch(AuthActions.logout());
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select((state) => state.auth.isAuthenticated);
  }

  getUserId(): string | null {
    const userId = localStorage.getItem(this.userIdKey);
    console.log('Retrieved User ID:', userId); // Debugging line
    return userId;
  }
}
