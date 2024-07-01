import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  checked: boolean = false;
  private baseURL = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  // checkLogin() {
  //   const storage = localStorage.getItem('jwt');
  //   if (storage == null) return;
  //   // console.log('>>> jwt retrieved: ', storage);
  //   this.isLoggedIn = true;
  //   this.checked = true;
  // }

  // create user
  createUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/createUser`, user);
  }

  authenticateUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/authenticateUser`, user);
  }

  signout(): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/signout`, {});
  }
}