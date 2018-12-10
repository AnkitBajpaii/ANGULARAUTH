import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/api';
  private endPoints = {
    register: `${this.baseUrl}/register`,
    login: `${this.baseUrl}/login`
  };

  constructor(private _http: HttpClient) { }

  register(user) {
    return this._http.post<any>(this.endPoints.register, user).pipe(catchError(this.handleError));

  }

  login(user) {
    return this._http.post<any>(this.endPoints.login, user).pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('token');
  }

  loggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(error.message || 'Server error');
  }
}
