import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err) {
          if (err.status === 400) {
            if (err.error.errors) {
              throw err.error;
            } else {
              this.toastr.error(err.error.message, err.error.statusCode);
            }
          }
          if (err.status === 401) {
            this.toastr.error(err.error.message, err.error.statusCode);
          }
          if (err.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (err.status === 500) {
            const extras: NavigationExtras = { state: { error: err.error } };
            this.router.navigateByUrl('/server-error', extras);
          }
        }
        return throwError(err);
      })
    );
  }
}
