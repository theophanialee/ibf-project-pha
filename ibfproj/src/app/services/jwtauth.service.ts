import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtauthService {
  private tokenKey = 'kitchenkakisJWT';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService) {
    this.isAuthenticatedSubject.next(this.getToken() !== '');
  }

  // Save JWT token to cookie
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 1, path: '/' });
    this.isAuthenticatedSubject.next(true); // Update authentication state
  }

  // Retrieve JWT token from cookie
  getToken(): string | undefined {
    return this.cookieService.get(this.tokenKey);
  }

  // Remove JWT token from cookie
  removeToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.isAuthenticatedSubject.next(false); // Update authentication state
  }

  // Check if user is authenticated (token present and valid)
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
