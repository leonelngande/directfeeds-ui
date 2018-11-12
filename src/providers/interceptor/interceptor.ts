import {ToastController} from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(
    private toastCtrl: ToastController,
  ) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('inside interceptor');
    return next.handle(request).pipe(
      catchError(err => {
        let errorText = '';
        if (err.error) {
          errorText = err.error.message;
        } else if (err.statusText) {
          errorText = err.statusText;
        }

        let toast = this.toastCtrl.create({
          message: errorText ? errorText : err.name,
          duration: 3000,
          position: 'top',
          cssClass: 'error',
        });
        toast.present();

        // Pass the error to the caller of the function
        return _throw(err);
      })
    );
  }
}
