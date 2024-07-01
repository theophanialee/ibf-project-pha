import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models';

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
    private loginSvc: LoginService
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
        next: (data) => {
          console.log('User authenticated', data);
          if (data.isExist) {
            this.router.navigate(['/home']);
          } else {
            alert('Authentication failed. Please check your credentials.');
            this.loginForm.reset(); // Reset the form on authentication failure
          }
        },
        error: (error) => {
          alert('Authentication failed. Please check your credentials.');
          console.error(error);
          this.loginForm.reset(); // Reset the form on error
        },
      });
    } else {
      console.log('Invalid form data.');
    }
  }
}
