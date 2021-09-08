import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpCacheService } from "./http-cache.service";
import { tap } from "rxjs/operators";
import { of } from "rxjs";
import { CACHE_REQUEST } from "./cache";

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const {cached, id} = request.context.get(CACHE_REQUEST);

    if (cached) {
      const cachedResponse = this.cacheService.get(request) || null;
      if (cachedResponse) {
        console.log(`HTTP Request - ${id} - Response retrieved from local Cache`);
        return of(cachedResponse);
      }
    }

    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse && cached) {
        this.cacheService.put(request, event);
      }
    }));
  }
}
