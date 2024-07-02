import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtauthService } from '../services/jwtauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  signupComplete = false;

  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private jwtAuthSvc: JwtauthService
  ) {}

  signout(): Observable<any> {
    const signoutObservable = this.loginSvc.signout();
    signoutObservable.subscribe({
      next: (response: any) => {
        console.log('Signout response:', response);

        if (response.isSignedOut === true) {
          this.jwtAuthSvc.removeToken();
          this.signupComplete = true; // Display "Signup complete" message or handle as needed
          this.router.navigate(['/login']); // Redirect to login page after signout
        }
      },
      error: (error) => {
        console.error('Failed to sign out', error);
      },
    });

    return signoutObservable;
  }
}
