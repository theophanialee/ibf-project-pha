// jwt-authentication.service.ts

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class JwtauthService {
  private tokenKey = 'kitchenkakisJWT';

  constructor(private cookieService: CookieService) {}

  // Save JWT token to cookie
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 1, path: '/' }); // expires in 1 day
  }

  // Retrieve JWT token from cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove JWT token from cookie
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/', 'localhost');
  }

  // Check if user is authenticated (token present and valid)
  isAuthenticated(): boolean {
    const token = this.getToken();
    // Example validation logic (you may want to decode and verify the token)
    return token !== undefined && token !== '';
  }
}
