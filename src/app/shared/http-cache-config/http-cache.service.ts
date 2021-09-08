import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

export abstract class HttpCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | null;

  abstract put(req: HttpRequest<any>, resp: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService implements HttpCache {


  constructor() {
  }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    return localStorage.getItem(req.urlWithParams) ?
      new HttpResponse<any>(JSON.parse(localStorage.getItem(req.urlWithParams) || ""))
      : null;
  }

  put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    localStorage.setItem(req.urlWithParams, JSON.stringify(resp));
  }

}
