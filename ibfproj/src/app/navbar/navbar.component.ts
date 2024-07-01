import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  signupComplete = false;

  constructor(private loginSvc: LoginService, private router: Router) {}

  signout(): void {
    this.loginSvc.signout().subscribe(
      () => {
        console.log('Successfully signed out');
        this.signupComplete = true; // Display "Signup complete" message or handle as needed
      },
      (error) => {
        console.error('Failed to sign out', error);
        // Handle error, e.g., display error message to user
      }
    );
  }
}
