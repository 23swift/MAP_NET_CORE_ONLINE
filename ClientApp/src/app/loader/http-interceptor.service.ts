import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res => {
        if (res.type === HttpEventType.Sent) {
          setTimeout(() => { this.loaderService.loading$.next(true) });
        }
        if (res.type === HttpEventType.Response) {
          setTimeout(() => { this.loaderService.loading$.next(false) });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        setTimeout(() => { this.loaderService.errorFlag$.next(true) });

        setTimeout(() => {
          this.loaderService.loading$.next(false);
          this.loaderService.errorFlag$.next(false);
        }, 10000);
        return throwError(error);
      })
    );
  }
}
