import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthResponse, User } from '../models';
import { HttpResponse } from '@angular/common/http'; // Import HttpResponse
import { JwtauthService } from '../services/jwtauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginSvc: LoginService,
    private jwtAuthSvc: JwtauthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  authenticateUser() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;

      this.loginSvc.authenticateUser(user).subscribe({
        next: (response: AuthResponse) => {
          console.log('User authenticated', response);

          if (response.isExist) {
            // Check if the user exists
            // Extract JWT token from response body
            const jwtToken = response.kitchenkakisJWT;
            console.log('JWT Token:', jwtToken);
            const userId = response.userId;
            const username = response.username;

            if (jwtToken && userId) {
              this.jwtAuthSvc.saveToken(jwtToken, userId, username);
              this.router.navigate(['/household']);
            } else {
              alert('JWT Token is missing in the response.');
            }
          } else {
            alert('Authentication failed. Please check your credentials.');
            this.loginForm.reset();
          }
        },
        error: (error) => {
          alert('Error occurred during authentication. Please try again.');
          console.error('Authentication Error:', error);
          this.loginForm.reset();
        },
      });
    } else {
      console.log('Invalid form data.');
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
