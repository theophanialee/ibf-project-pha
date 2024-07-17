import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { JwtauthService } from '../services/jwtauth.service';
import * as AuthActions from '../states/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  signupComplete = false;
  username: string | null = null;

  constructor(
    private router: Router,
    private jwtAuthSvc: JwtauthService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  signout(): void {
    this.store.dispatch(AuthActions.logout());
    this.jwtAuthSvc.removeToken();
    this.signupComplete = true;
    localStorage.removeItem('selectedHouseholdId');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
