import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models';
import { AuthResponse } from '../../models/authresponse.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = 'http://localhost:8080/api/auth';
  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/createUser`, user);
  }

  authenticateUser(user: User): Observable<AuthResponse> {
    return this.httpClient.post<any>(`${this.baseURL}/authenticateUser`, user);
  }

  signout(): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/signout`, {});
  }
}
