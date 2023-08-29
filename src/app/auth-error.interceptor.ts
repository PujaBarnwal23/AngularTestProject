import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          // Unauthorized error detected, redirect to login page
          alert('login failed! IC')
          this.router.navigate(['/login']);
        }
        

        const err = error.error?.message || error.statusText;
            console.error(error.statusText);
            return throwError(() => err);
      })
    );
  }
}
