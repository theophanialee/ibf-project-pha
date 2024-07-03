// jwt-authentication.service.ts

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { RoutesService } from './routes.service';

@Injectable({
  providedIn: 'root',
})
export class JwtauthService {
  private tokenKey = 'kitchenkakisJWT';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private cookieService: CookieService,
    private routesSvc: RoutesService
  ) {}

  // Save JWT token to cookie
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 1, path: '/' }); // expires in 1 day
    this.isLoggedInSubject.next(true);
  }

  // Retrieve JWT token from cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove JWT token from cookie
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/', 'localhost');
    this.isLoggedInSubject.next(false);
  }

  // Check if user is authenticated (token present and valid)
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Example validation logic (you may want to decode and verify the token)
    return token !== undefined && token !== '';
  }
}
