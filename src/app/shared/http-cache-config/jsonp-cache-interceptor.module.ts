import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpCacheInterceptor } from "./http-cache.interceptor";

/**
 * This module is specifically request inorder to intercept jsonp requests.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true
    }
  ]
})
export class JsonpCacheInterceptorModule { }
