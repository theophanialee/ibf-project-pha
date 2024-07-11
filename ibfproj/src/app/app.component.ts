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
    console.log('show nav bar1', this.showNavbar);
    this.jwtAuthSvc.isAuthenticated().subscribe((isAuthenticated) => {
      this.showNavbar = isAuthenticated;
      console.log('is authenticated??', isAuthenticated);
      console.log('show nav bar2', this.showNavbar);
    });
  }

  private checkLocalStorage(): void {
    console.log('show nav bar3', this.showNavbar);
    const selectedHouseholdId = localStorage.getItem('selectedHouseholdId');
    this.showNavbar = !!selectedHouseholdId;
    console.log('show nav bar4', this.showNavbar);
  }
}
