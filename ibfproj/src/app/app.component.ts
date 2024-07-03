import { Component, OnInit } from '@angular/core';
import { JwtauthService } from './services/jwtauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ibfproj';

  itle = 'ibfproj';
  showNavbar: boolean = false;

  constructor(private jwtAuthSvc: JwtauthService) {}

  ngOnInit(): void {
    this.jwtAuthSvc.isAuthenticated().subscribe((isAuthenticated) => {
      this.showNavbar = isAuthenticated;
    });
  }
}
