import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = 'http://localhost:3000/api';
  private endPoints = {
    register: `${this.baseUrl}/restricted`
  };

  constructor(private _http: HttpClient) { }

  getRestrictedData() {
    return this._http.get(this.endPoints.register).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);

    return throwError(error.message || 'Server error');
  }
}
