import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: any) => {
                if (event.body && event.body instanceof Blob) return event;
                if (event.body && event.body.errorCode != "E0") {
                    throw event
                }
                return event
            }),
            catchError((err: HttpErrorResponse) => {
                return throwError(() => err)
            })
        )
    }
}
