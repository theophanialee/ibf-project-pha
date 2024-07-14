import { Component } from '@angular/core';
import { JwtauthService } from './services/jwtauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ibfproj';
  showNavbar: boolean = false;

  constructor(private jwtAuthSvc: JwtauthService) {
    this.checkLocalStorage();
    window.addEventListener('storage', () => {
      this.checkLocalStorage();
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit: show nav bar initial', this.showNavbar);
    this.jwtAuthSvc.isAuthenticated().subscribe((isAuthenticated) => {
      console.log('ngOnInit: is authenticated?', isAuthenticated);
      this.showNavbar = isAuthenticated;
      console.log('ngOnInit: show nav bar after auth check', this.showNavbar);
    });
  }

  private checkLocalStorage(): void {
    console.log('checkLocalStorage: show nav bar before', this.showNavbar);
    const selectedHouseholdId = localStorage.getItem('selectedHouseholdId');
    this.showNavbar = !!selectedHouseholdId;
    console.log('checkLocalStorage: selectedHouseholdId', selectedHouseholdId);
    console.log('checkLocalStorage: show nav bar after', this.showNavbar);
  }
}