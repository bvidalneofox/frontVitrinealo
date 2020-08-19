import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private _errorService: ErrorService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');

    let request = req;

    if (token) {
      request = req.clone({
        setParams: {
          token: token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        
        if (err.status === 401) {
          this.router.navigateByUrl('');
        }

        if (err.status === 400) {
          Swal.fire('Error', err.error.mensaje,'error');
        }

        if (err.status === 500) {
          Swal.fire('Error', err.error.mensaje,'error');
          this._errorService.setError(err).subscribe(response => {
          });
        }

        return throwError(err);

      })
    );
  }

}
