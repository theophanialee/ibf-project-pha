import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginSvc: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  createUser() {
    this.submitted = true;

    if (this.signupForm.valid) {
      const user = this.signupForm.value as User;
      console.log('User created:', user);

      this.loginSvc.createUser(user).subscribe({
        next: (data) => {
          console.log('User saved', data);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert('Error in saving user');
          console.error(error);
        },
      });
    } else {
      console.log('Invalid form data.');
    }
  }
}
