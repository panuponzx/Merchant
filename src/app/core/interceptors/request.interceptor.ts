import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // const httpHeaders = new HttpHeaders()
      //         .set('content-type', 'application/json')
      // const newReq = req.clone({
      //   headers: httpHeaders
      // });
      return next.handle(req);
    }
}
