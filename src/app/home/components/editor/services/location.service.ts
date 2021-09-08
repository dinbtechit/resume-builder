import { Injectable } from '@angular/core';
import {
  HttpClient, HttpContext,
  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocationDetails } from "../model/location";
import { catchError, tap } from "rxjs/operators";
import { CACHE_REQUEST } from '../../../../shared/http-cache-config/cache';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private httpClient: HttpClient) {
  }

  getLocation(): Observable<LocationDetails> | Observable<any> {

    const httpContext = new HttpContext();
    httpContext.set(CACHE_REQUEST, {cached: true, id: 'location'})

    return this.httpClient.request<any>(
      'jsonp',
      'http://ip-api.com/json?callback=JSONP_CALLBACK',
      {context: httpContext})
      .pipe(
        catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

